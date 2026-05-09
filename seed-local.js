const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'server', 'data', 'db.json');

function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function randId(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 6)}`;
}

const now = new Date();
const d = (days, hours = 0) => new Date(now.getTime() - days * 86400000 - hours * 3600000).toISOString();

const newCustomers = [
  { id: randId('cus'), name: '比亚迪汽车', contact: '王工', phone: '13800138010', email: 'wang@byd.com', address: '深圳市坪山区', industry: '汽车', level: 'A', devices: [{ name: 'RVC X1', model: 'RVC-X1', sn: 'SN000001' }], createdAt: d(12, 5) },
  { id: randId('cus'), name: '宁德时代', contact: '李经理', phone: '13800138011', email: 'li@catl.com', address: '宁德市东侨区', industry: '新能源', level: 'A', devices: [{ name: 'RVC G1', model: 'RVC-G1', sn: 'SN000002' }, { name: 'RVC X2', model: 'RVC-X2', sn: 'SN000003' }], createdAt: d(10, 8) },
  { id: randId('cus'), name: '美的集团', contact: '张主管', phone: '13800138012', email: 'zhang@midea.com', address: '佛山市顺德区', industry: '家电', level: 'A', devices: [{ name: 'RVC P1', model: 'RVC-P1', sn: 'SN000004' }], createdAt: d(8, 3) },
  { id: randId('cus'), name: '富士康科技', contact: '陈课长', phone: '13800138013', email: 'chen@foxconn.com', address: '深圳市龙华区', industry: '电子', level: 'B', devices: [{ name: 'RVC M2', model: 'RVC-M2', sn: 'SN000005' }], createdAt: d(15, 6) },
  { id: randId('cus'), name: '广汽集团', contact: '刘工', phone: '13800138014', email: 'liu@gac.com', address: '广州市番禺区', industry: '汽车', level: 'A', devices: [{ name: 'RVC X1', model: 'RVC-X1', sn: 'SN000006' }], createdAt: d(6, 4) },
  { id: randId('cus'), name: '格力电气', contact: '赵经理', phone: '13800138015', email: 'zhao@gree.com', address: '珠海市香洲区', industry: '家电', level: 'B', devices: [{ name: 'RVC P1', model: 'RVC-P1', sn: 'SN000007' }], createdAt: d(18, 2) },
  { id: randId('cus'), name: '京东方', contact: '孙博士', phone: '13800138016', email: 'sun@boe.com', address: '北京市亦庄', industry: '半导体', level: 'A', devices: [{ name: 'RVC G1', model: 'RVC-G1', sn: 'SN000008' }], createdAt: d(5, 7) },
  { id: randId('cus'), name: '大疆创新', contact: '周总监', phone: '13800138017', email: 'zhou@dji.com', address: '深圳市南山区', industry: '无人机', level: 'A', devices: [{ name: 'RVC X2', model: 'RVC-X2', sn: 'SN000009' }], createdAt: d(7, 9) },
  { id: randId('cus'), name: '长盈精密', contact: '吴经理', phone: '13800138018', email: 'wu@chamy.com', address: '东莞市大朗镇', industry: '精密制造', level: 'B', devices: [{ name: 'RVC M2', model: 'RVC-M2', sn: 'SN000010' }], createdAt: d(9, 1) },
  { id: randId('cus'), name: '立讯精密', contact: '郑工', phone: '13800138019', email: 'zheng@luxshare.com', address: '东莞市清溪镇', industry: '电子', level: 'A', devices: [{ name: 'RVC P1', model: 'RVC-P1', sn: 'SN000011' }], createdAt: d(4, 5) },
  { id: randId('cus'), name: '鹏鼎控股', contact: '冯经理', phone: '13800138020', email: 'feng@avary.com', address: '深圳市宝安区', industry: 'PCB', level: 'B', devices: [{ name: 'RVC X1', model: 'RVC-X1', sn: 'SN000012' }], createdAt: d(11, 3) },
  { id: randId('cus'), name: '欣旺达', contact: '杨工', phone: '13800138021', email: 'yang@sunwoda.com', address: '深圳市光明区', industry: '新能源', level: 'B', devices: [{ name: 'RVC G1', model: 'RVC-G1', sn: 'SN000013' }], createdAt: d(3, 6) },
  { id: randId('cus'), name: '蓝思科技', contact: '何总监', phone: '13800138022', email: 'he@lens.com', address: '长沙市浏阳区', industry: '玻璃', level: 'A', devices: [{ name: 'RVC M2', model: 'RVC-M2', sn: 'SN000014' }], createdAt: d(14, 2) },
  { id: randId('cus'), name: '伯恩光学', contact: '许经理', phone: '13800138023', email: 'xu@biel.com', address: '惠州市惠阳区', industry: '玻璃', level: 'B', devices: [{ name: 'RVC P1', model: 'RVC-P1', sn: 'SN000015' }], createdAt: d(2, 8) },
  { id: randId('cus'), name: '领益智造', contact: '蒋工', phone: '13800138024', email: 'jiang@ly.com', address: '东莞市黄江镇', industry: '电子', level: 'C', devices: [], createdAt: d(16, 4) },
  { id: randId('cus'), name: '信维通信', contact: '沈主管', phone: '13800138025', email: 'shen@sunnada.com', address: '深圳市南山区', industry: '通信', level: 'B', devices: [{ name: 'RVC X2', model: 'RVC-X2', sn: 'SN000016' }], createdAt: d(1, 3) },
  { id: randId('cus'), name: '三环集团', contact: '韩经理', phone: '13800138026', email: 'han@cht.com', address: '潮州市湘桥区', industry: '陶瓷', level: 'C', devices: [], createdAt: d(13, 7) },
  { id: randId('cus'), name: '生益科技', contact: '马工', phone: '13800138027', email: 'ma@syst.com', address: '东莞市松山湖', industry: '材料', level: 'B', devices: [{ name: 'RVC G1', model: 'RVC-G1', sn: 'SN000017' }], createdAt: d(20, 5) },
  { id: randId('cus'), name: '德赛电池', contact: '钱经理', phone: '13800138028', email: 'qian@desay.com', address: '惠州市仲恺区', industry: '新能源', level: 'B', devices: [{ name: 'RVC X1', model: 'RVC-X1', sn: 'SN000018' }], createdAt: d(17, 1) },
  { id: randId('cus'), name: '中科创达', contact: '孔总监', phone: '13800138029', email: 'kong@thunder.com', address: '北京市海淀区', industry: '软件', level: 'A', devices: [{ name: 'RVC P1', model: 'RVC-P1', sn: 'SN000019' }], createdAt: d(2, 9) },
  { id: randId('cus'), name: '汇川技术', contact: '白工', phone: '13800138030', email: 'bai@inovance.com', address: '深圳市宝安区', industry: '自动化', level: 'A', devices: [{ name: 'RVC M2', model: 'RVC-M2', sn: 'SN000020' }], createdAt: d(5, 6) },
  { id: randId('cus'), name: '埃斯顿自动化', contact: '孟主管', phone: '13800138031', email: 'meng@estun.com', address: '南京市江宁区', industry: '机器人', level: 'B', devices: [{ name: 'RVC G1', model: 'RVC-G1', sn: 'SN000021' }], createdAt: d(8, 2) },
  { id: randId('cus'), name: '新时达电气', contact: '曹经理', phone: '13800138032', email: 'cao@step.com', address: '上海市嘉定区', industry: '电梯', level: 'C', devices: [], createdAt: d(19, 4) },
  { id: randId('cus'), name: '汇顶科技', contact: '彭工', phone: '13800138033', email: 'peng@goodix.com', address: '深圳市南山区', industry: '芯片', level: 'A', devices: [{ name: 'RVC X2', model: 'RVC-X2', sn: 'SN000022' }], createdAt: d(3, 7) },
  { id: randId('cus'), name: '兆易创新', contact: '龙总监', phone: '13800138034', email: 'long@gigadevice.com', address: '北京市海淀区', industry: '芯片', level: 'A', devices: [{ name: 'RVC P1', model: 'RVC-P1', sn: 'SN000023' }], createdAt: d(6, 1) },
  { id: randId('cus'), name: '韦尔股份', contact: '邓经理', phone: '13800138035', email: 'deng@willsemi.com', address: '上海市浦东新区', industry: '半导体', level: 'B', devices: [{ name: 'RVC M2', model: 'RVC-M2', sn: 'SN000024' }], createdAt: d(12, 8) },
  { id: randId('cus'), name: '卓胜微电子', contact: '万工', phone: '13800138036', email: 'wan@maxscend.com', address: '无锡市滨湖区', industry: '射频', level: 'B', devices: [{ name: 'RVC G1', model: 'RVC-G1', sn: 'SN000025' }], createdAt: d(7, 3) },
  { id: randId('cus'), name: '思瑞浦', contact: '雷主管', phone: '13800138037', email: 'lei@3peak.com', address: '苏州市工业园区', industry: '模拟芯片', level: 'C', devices: [], createdAt: d(14, 5) },
  { id: randId('cus'), name: '圣邦微电子', contact: '汤经理', phone: '13800138038', email: 'tang@sgmicro.com', address: '北京市海淀区', industry: '模拟芯片', level: 'B', devices: [{ name: 'RVC X1', model: 'RVC-X1', sn: 'SN000026' }], createdAt: d(9, 6) },
];

const statuses = ['pending', 'processing', 'waiting', 'resolved', 'closed'];
const priorities = ['low', 'medium', 'high'];
const categories = ['点云调试', '硬件故障', '软件问题', 'SDK开发', '手眼标定', '需求沟通', '样品测试', '相机选型'];

const ticketTitles = [
  '相机连接失败排查', '点云噪声过大处理', '标定板识别异常', '深度图出现空洞', 'SDK编译报错',
  '手眼标定误差超差', '相机过热保护停机', '投影亮度不均匀', '曝光参数自动调节失效', 'HDR合成结果异常',
  '2D图像偏色校正', '多相机同步触发失败', '点云与2D对齐偏差', '置信度去噪效果不佳', '聚类去噪误删有效点',
  '反射去噪参数调优', '高斯平滑边缘模糊', '下采样后特征丢失', 'Z向截断范围设置', '工作距离检测报警',
  '防护罩开合异常', '固定线扫丢帧排查', '编码器触发间隔计算', '摆动线扫时间优化', '激光位置偏移修正',
  '带宽设置影响帧率', 'ROI裁剪后精度下降', '自动白平衡失效', '同心圆检测漏检', '简易精度检测不通过',
  '用户坐标系设置错误', '快速设置坐标系偏差', '参数组切换失败', '导入参数格式错误', '固件升级后参数丢失',
  'CUDA加速不可用', '抗多次反射模式异常', '快速模式点云缺失', '高精度模式拍摄超时', '线扫置信度阈值调节',
  '客户现场环境光干扰', '深色工件点云不完整', '高反光物体过曝', '透明材质成像失败', '细小缝隙检测不到',
  '多反射面接缝缺失', '标定参数与出厂不一致', '相机外参矩阵异常', '畸变系数校正失败', '内参焦距偏差',
  'RVC-P系列视野不足', 'RVC-G系列激光线宽度', 'RVC-M系列帧率优化', 'RVC-X系列分辨率切换', '彩色相机白平衡偏移',
];

const descriptions = [
  '客户现场反馈问题，需要远程协助排查。', '已初步定位原因，待备件更换验证。', '需要工程师到现场支持，客户催办中。',
  '问题复现困难，需要多次测试验证。', '客户已提供现场照片和视频，请参考。', '该问题影响产线节拍，请优先处理。',
  '此前类似问题已解决，可参考历史方案。', '需要更新固件版本，客户已同意。', '客户要求出具正式报告，请尽快完成。',
];

const db = readDb();
const engIds = db.users.filter(u => u.role === 'engineer').map(u => u.id);
const allCustomerIds = [...db.customers.map(c => c.id), ...newCustomers.map(c => c.id)];

let seq = 1;
function nextTicketId() {
  const n = new Date();
  const yy = String(n.getFullYear()).slice(2);
  const mm = String(n.getMonth() + 1).padStart(2, '0');
  const dd = String(n.getDate()).padStart(2, '0');
  return `RVC-${yy}${mm}${dd}${String(seq++).padStart(3, '0')}`;
}

const newTickets = [];
for (let i = 0; i < 55; i++) {
  const customerId = allCustomerIds[i % allCustomerIds.length];
  const engineerId = engIds[i % engIds.length];
  const status = statuses[i % statuses.length];
  const priority = priorities[i % priorities.length];
  const category = categories[i % categories.length];
  const title = ticketTitles[i % ticketTitles.length];
  const desc = descriptions[i % descriptions.length];
  const daysAgo = Math.floor(i / 5);
  const hoursAgo = (i % 8);
  const createdAt = d(daysAgo, hoursAgo);
  const updatedAt = status === 'resolved' || status === 'closed' ? d(daysAgo - 1, hoursAgo + 2) : createdAt;
  const dueDays = priority === 'high' ? 1 : priority === 'medium' ? 3 : 7;
  const dueDate = new Date(new Date(createdAt).getTime() + dueDays * 86400000).toISOString();

  newTickets.push({
    ticketType: 'RVC',
    title,
    customerId,
    engineerId,
    status,
    priority,
    category,
    description: desc,
    images: [],
    createdAt,
    updatedAt,
    dueDate,
    creatorId: 'u1',
    comments: [],
    id: nextTicketId()
  });
}

// 追加数据
db.customers.push(...newCustomers);
db.tickets.push(...newTickets);

writeDb(db);
console.log(`[Seed] 已添加 ${newCustomers.length} 个客户，${newTickets.length} 个工单`);
console.log(`[Seed] 当前总计：${db.customers.length} 客户，${db.tickets.length} 工单`);
