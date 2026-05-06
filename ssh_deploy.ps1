$password = "010921Zj"
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "ssh"
$psi.Arguments = "-o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no -o ConnectTimeout=60 root@120.55.245.72 cd /root/crm_new; git pull origin main; pm2 restart crm-new"
$psi.RedirectStandardInput = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.UseShellExecute = $false
$proc = [System.Diagnostics.Process]::Start($psi)
Start-Sleep -Seconds 3
$proc.StandardInput.WriteLine($password)
$proc.StandardInput.Close()
$output = $proc.StandardOutput.ReadToEnd()
$errorOut = $proc.StandardError.ReadToEnd()
$proc.WaitForExit(45000)
Write-Output "=== STDOUT ==="
Write-Output $output
Write-Output "=== STDERR ==="
Write-Output $errorOut
Write-Output "Exit: $($proc.ExitCode)"
