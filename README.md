# 技术支持工单与客户管理系统

基于 Express + lowdb + 单文件 HTML 的极简工单管理系统，专为 RVC 相机技术支持团队设计。

## 在线演示

- **生产环境**：http://120.55.245.72:38000
- **技术栈**：Express 4.x + lowdb (JSON DB) + Vanilla JS

## 功能特性

| 模块 | 功能 |
|------|------|
| **工单管理** | 创建、编辑、删除、状态流转（待处理→处理中→等待回复→已解决→已关闭） |
| **客户管理** | 客户信息、设备清单、联系记录 |
| **智能解析** | 自然语言输入自动识别客户、优先级、问题类型 |
| **RVC 分类** | 点云调试、硬件故障、软件问题、SDK开发、手眼标定、需求沟通、样品测试、相机选型 |
| **权限控制** | 管理员可查看全部，工程师只能编辑自己负责的工单 |
| **图片附件** | 上传/粘贴图片，Base64 内联存储 |
| **统计报表** | 工单状态、优先级、工程师工作量、分类分布 |

## 快速开始

### 本地开发

```bash
cd server
npm install
node server.js
```

访问 http://localhost:3000

**默认账号**：
- `admin` / `admin123`（管理员）
- `zhangsan` / `123456`（工程师）

### 生产部署

```bash
# 服务器
ssh root@120.55.245.72
cd /root/crm_new
./update.sh   # 自动 git pull + npm install + pm2 restart
```

## 项目结构

```
tech-support-crm/
├── project/
│   └── index.html          # 前端单文件应用 (~2150 行)
├── server/
│   ├── server.js           # Express 后端
│   ├── database.js         # lowdb 数据层
│   ├── package.json        # 依赖
│   └── init_db.js          # 数据库初始化
└── update.sh               # 服务器自动更新脚本
```

## Git 工作流

| 环境 | 操作 |
|------|------|
| 本地开发 | 修改代码 → `git commit` → `git push origin main` |
| 服务器更新 | `cd /root/crm_new && ./update.sh` |

## 已知问题

1. 工单编号极小概率重复（基于时间戳后 6 位）
2. 密码明文存储
3. 图片附件 Base64 内联导致 `db.json` 膨胀
4. 缺少数据导出/备份功能
5. 工单/客户列表无分页

## License

MIT
