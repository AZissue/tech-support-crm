const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 创建密码输入文件
const passFile = path.join(__dirname, '.ssh_pass.txt');
fs.writeFileSync(passFile, '010921Zj\n');

// 创建远程执行脚本
const remoteScript = `cd /root/crm_new
if ! git pull origin main 2>/dev/null; then
  wget -O main.zip https://mirror.ghproxy.com/https://github.com/AZissue/tech-support-crm/archive/refs/heads/main.zip 2>/dev/null
  if [ -f main.zip ]; then
    unzip -o main.zip
    cp -rf tech-support-crm-main/* .
    rm -rf tech-support-crm-main main.zip
  fi
fi
pm2 restart crm-new
echo 'DEPLOY_DONE'
`;

const scriptFile = path.join(__dirname, 'remote_deploy.sh');
fs.writeFileSync(scriptFile, remoteScript);

// 使用 scp 上传脚本
const scp = spawn('scp', [
  '-o', 'StrictHostKeyChecking=no',
  '-o', 'ConnectTimeout=30',
  scriptFile,
  'root@120.55.245.72:/root/crm_new/'
], {
  stdio: ['pipe', 'pipe', 'pipe'],
  detached: true
});

let scpOutput = '';
scp.stdout.on('data', d => scpOutput += d);
scp.stderr.on('data', d => scpOutput += d);

scp.on('close', (code) => {
  console.log('SCP exit:', code, scpOutput);
  if (code === 0) {
    // 上传成功，执行远程脚本
    const ssh = spawn('ssh', [
      '-o', 'StrictHostKeyChecking=no',
      '-o', 'ConnectTimeout=30',
      'root@120.55.245.72',
      'bash /root/crm_new/remote_deploy.sh'
    ], {
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: true
    });

    let sshOutput = '';
    ssh.stdout.on('data', d => {
      sshOutput += d;
      console.log('SSH OUT:', d.toString().trim());
    });
    ssh.stderr.on('data', d => {
      sshOutput += d;
      console.log('SSH ERR:', d.toString().trim());
    });

    ssh.on('close', (code2) => {
      console.log('SSH exit:', code2);
      console.log('Full output:', sshOutput);
      // 清理
      try { fs.unlinkSync(passFile); } catch(e){}
      try { fs.unlinkSync(scriptFile); } catch(e){}
    });

    // 输入密码
    ssh.stdin.write('010921Zj\n');
    ssh.stdin.end();
  } else {
    console.log('SCP failed, trying direct SSH...');
    try { fs.unlinkSync(passFile); } catch(e){}
    try { fs.unlinkSync(scriptFile); } catch(e){}
  }
});

// 输入密码给 scp
scp.stdin.write('010921Zj\n');
scp.stdin.end();

// 让进程保持运行
setTimeout(() => {}, 60000);
