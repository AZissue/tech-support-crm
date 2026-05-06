@echo off
echo === CRM 服务器部署脚本 ===
echo 密码: 010921Zj
echo.

ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no root@120.55.245.72 "cd /root/crm_new ; git pull origin main ; pm2 restart crm-new"
if %errorlevel% neq 0 (
    echo.
    echo [Git 失败，尝试 wget 下载...]
    ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no root@120.55.245.72 "cd /root/crm_new ; wget -q -O main.zip https://mirror.ghproxy.com/https://github.com/AZissue/tech-support-crm/archive/refs/heads/main.zip ; unzip -oq main.zip ; cp -rf tech-support-crm-main/* . ; rm -rf tech-support-crm-main main.zip ; pm2 restart crm-new"
)

echo.
echo 部署完成，请访问 http://120.55.245.72:38000 检查
pause
