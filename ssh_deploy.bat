@echo off
echo 010921Zj | ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o StrictHostKeyChecking=no -o ConnectTimeout=60 root@120.55.245.72 "cd /root/crm_new ; git pull origin main ; pm2 restart crm-new"
