import paramiko

HOST = "120.55.245.72"
USER = "root"
PASS = "010921Zj"

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=PASS, timeout=20)
    
    stdin, stdout, stderr = client.exec_command(
        "cd /root/crm_new && git ls-files | grep -E 'db\\.json|data/' && echo 'TRACKED' || echo 'NOT_TRACKED'"
    )
    out = stdout.read().decode('utf-8', errors='ignore')
    err = stderr.read().decode('utf-8', errors='ignore')
    client.close()
    
    # 过滤掉控制台无法打印的字符
    import sys
    safe_out = out.encode(sys.stdout.encoding, errors='ignore').decode(sys.stdout.encoding)
    safe_err = err.encode(sys.stdout.encoding, errors='ignore').decode(sys.stdout.encoding)
    
    print("=== STDOUT ===")
    print(safe_out)
    if safe_err.strip():
        print("=== STDERR ===")
        print(safe_err)
    print("=== OK ===")
except Exception as e:
    print(f"ERROR: {e}")
