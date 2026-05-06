@echo off
echo 010921Zj | ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no -o ConnectTimeout=60 root@120.55.245.72 "cd /root/crm_new ; git pull origin main ; pm2 restart crm-new"
if %errorlevel% neq 0 (
    echo Deploy failed, trying alternative method...
    echo 010921Zj | ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no -o ConnectTimeout=60 root@120.55.245.72 "cd /root/crm_new ; wget -O main.zip https://mirror.ghproxy.com/https://github.com/AZissue/tech-support-crm/archive/refs/heads/main.zip ; unzip -o main.zip ; cp -rf tech-support-crm-main/* . ; rm -rf tech-support-crm-main main.zip ; pm2 restart crm-new"
)
pause
