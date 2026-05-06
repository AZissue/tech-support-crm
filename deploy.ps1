# 一键部署脚本 - 在本地运行
# 用法: 右键 "使用 PowerShell 运行" 或 cmd 中执行: powershell -ExecutionPolicy Bypass -File deploy.ps1

$server = "120.55.245.72"
$user = "root"
$pass = "010921Zj"
$remoteDir = "/root/crm_new"

Write-Host "=== CRM 服务器一键部署 ===" -ForegroundColor Cyan

# 方法1: 直接 git pull (如果服务器能连 GitHub)
$cmd1 = @"
cd $remoteDir && git pull origin main && pm2 restart crm-new && echo 'SUCCESS_GIT'
"@

# 方法2: 用 wget 下载 zip 覆盖 (备用)
$cmd2 = @"
cd $remoteDir && wget -q -O main.zip https://mirror.ghproxy.com/https://github.com/AZissue/tech-support-crm/archive/refs/heads/main.zip && unzip -oq main.zip && cp -rf tech-support-crm-main/* . && rm -rf tech-support-crm-main main.zip && pm2 restart crm-new && echo 'SUCCESS_WGET'
"@

function Invoke-RemoteCommand ($command) {
    $secpass = ConvertTo-SecureString $pass -AsPlainText -Force
    $cred = New-Object System.Management.Automation.PSCredential($user, $secpass)
    
    try {
        $session = New-PSSession -HostName $server -UserName $user -SSHTransport -Credential $cred -ErrorAction Stop
        $result = Invoke-Command -Session $session -ScriptBlock { 
            param($c)
            Invoke-Expression $c
        } -ArgumentList $command
        Remove-PSSession $session
        return $result
    } catch {
        Write-Host "PowerShell SSH 失败: $_" -ForegroundColor Yellow
        return $null
    }
}

# 尝试方法1 (git)
Write-Host "尝试方法1: git pull..." -ForegroundColor Green
$result = Invoke-RemoteCommand $cmd1

if ($result -match "SUCCESS_GIT") {
    Write-Host "✅ 部署成功 (git pull)" -ForegroundColor Green
    Write-Host $result
    exit 0
}

# 尝试方法2 (wget)
Write-Host "尝试方法2: wget 下载..." -ForegroundColor Yellow
$result = Invoke-RemoteCommand $cmd2

if ($result -match "SUCCESS_WGET") {
    Write-Host "✅ 部署成功 (wget)" -ForegroundColor Green
    Write-Host $result
    exit 0
}

# 如果 PowerShell SSH 都失败，回退到 cmd ssh
Write-Host "PowerShell SSH 失败，尝试 cmd ssh..." -ForegroundColor Yellow

$batContent = @"
@echo off
echo %pass% | ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no -o ConnectTimeout=60 %user%@%server% "cd %remoteDir% ; git pull origin main ; pm2 restart crm-new"
if errorlevel 1 (
    echo Git failed, trying wget...
    echo %pass% | ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no -o ConnectTimeout=60 %user%@%server% "cd %remoteDir% ; wget -q -O main.zip https://mirror.ghproxy.com/https://github.com/AZissue/tech-support-crm/archive/refs/heads/main.zip ; unzip -oq main.zip ; cp -rf tech-support-crm-main/* . ; rm -rf tech-support-crm-main main.zip ; pm2 restart crm-new"
)
pause
"@

$batFile = Join-Path $PSScriptRoot "deploy_fallback.bat"
$batContent | Out-File -FilePath $batFile -Encoding ASCII
Write-Host "已生成回退脚本: $batFile" -ForegroundColor Cyan
Write-Host "请手动双击运行该脚本完成部署" -ForegroundColor Yellow

Read-Host "按回车键退出"
