'use client';

import { useState, useMemo } from 'react';

// 指南数据类型定义
interface Guide {
  id: number;
  title: string;
  summary: string;
  category: '基础认知' | '碳核算' | '申报系统' | '行业专项' | '战略规划';
  targetAudience: string[];
  relatedSectors: string[];
  tags: string[];
  content: string;
}

// 内联全部23篇指南数据
const guidesData: Guide[] = [
  {
    id: 1,
    title: 'CBAM 机制全面解读：从零开始理解碳边境调节机制',
    summary: '深入解析欧盟CBAM的政策背景、实施目标、覆盖范围及核心运作机制，帮助企业建立完整的CBAM认知框架。',
    category: '基础认知',
    targetAudience: ['企业高管', '合规经理', '外贸负责人'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['政策解读', '基础知识', '欧盟法规'],
    content: 'CBAM（碳边境调节机制）是欧盟为防止碳泄漏而实施的重要政策工具。本指南将系统介绍CBAM的立法背景、法律依据、实施时间表以及对中国出口企业的具体影响。内容涵盖：欧盟碳排放交易体系（EU ETS）的关联、CBAM证书的计算方式、申报周期与流程、以及企业在过渡期应做的准备工作。'
  },
  {
    id: 2,
    title: 'CBAM 过渡期申报实操指南（2023-2025）',
    summary: '详细讲解过渡期内的季度申报流程、数据收集要求、常见问题及解决方案。',
    category: '申报系统',
    targetAudience: ['申报专员', '财务人员', '供应链管理'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['过渡期', '申报流程', '实操指南'],
    content: '过渡期是企业熟悉CBAM规则的关键时期。本指南提供：1）季度申报的完整时间表；2）所需数据清单与收集模板；3）欧盟CBAM门户网站操作步骤；4）默认值与实际排放的选择建议；5）过渡期申报与正式期的关键区别。'
  },
  {
    id: 3,
    title: '钢铁行业CBAM合规完全手册',
    summary: '针对钢铁企业的专项指南，涵盖钢铁产品碳核算方法、申报要点及减排策略。',
    category: '行业专项',
    targetAudience: ['钢铁企业', '碳排放工程师', '技术总监'],
    relatedSectors: ['钢铁'],
    tags: ['钢铁', '碳核算', '行业专项'],
    content: '钢铁行业是CBAM覆盖的重点领域。本手册详细说明：钢铁产品CN编码识别、长流程与短流程的碳排放差异、直接排放与间接排放的核算边界、欧盟认可的钢铁行业默认值、典型钢铁产品的CBAM申报案例。'
  },
  {
    id: 4,
    title: '铝行业碳排放核算与CBAM应对策略',
    summary: '电解铝及铝加工产品的CBAM核算方法、数据来源要求及合规建议。',
    category: '行业专项',
    targetAudience: ['铝业企业', '生产管理', '环保部门'],
    relatedSectors: ['铝'],
    tags: ['铝行业', '电解铝', '碳核算'],
    content: '铝行业因其高耗能特性备受CBAM关注。本指南包含：电解铝生产过程的碳排放源识别、阳极效应排放的特殊处理、电力消耗的间接排放核算、再生铝的碳足迹计算、铝材加工产品的CBAM处理方式。'
  },
  {
    id: 5,
    title: '水泥行业CBAM申报要点解析',
    summary: '水泥熟料及水泥产品的CBAM核算方法，包括过程排放的特殊处理。',
    category: '行业专项',
    targetAudience: ['水泥企业', '工艺工程师', '质量部门'],
    relatedSectors: ['水泥'],
    tags: ['水泥', '过程排放', '熟料'],
    content: '水泥行业的碳排放包含化石燃料排放和工艺过程排放两大类。本指南详解：熟料生产的碳排放核算、生料分解排放的计算方法、替代燃料的CBAM处理、水泥产品与熟料的申报区分、欧盟水泥行业基准值参考。'
  },
  {
    id: 6,
    title: '化肥行业CBAM合规路径',
    summary: '氮肥、磷肥等化肥产品的CBAM核算方法及申报注意事项。',
    category: '行业专项',
    targetAudience: ['化肥企业', '化工工程师', '安全环保'],
    relatedSectors: ['化肥'],
    tags: ['化肥', '氮肥', '化工'],
    content: '化肥行业涵盖氨、硝酸、硫酸铵等多种产品。本指南包括：合成氨生产的碳排放核算、硝酸工艺的N2O排放处理、不同化肥产品的CBAM边界划分、与欧盟化肥行业基准的对比分析。'
  },
  {
    id: 7,
    title: '氢气产品CBAM申报指南',
    summary: '氢气作为CBAM新覆盖产品的核算方法与申报要求详解。',
    category: '行业专项',
    targetAudience: ['氢能企业', '新能源部门', '技术管理'],
    relatedSectors: ['氢气'],
    tags: ['氢气', '新能源', '绿氢'],
    content: '氢气被纳入CBAM覆盖范围具有重要意义。本指南说明：灰氢、蓝氢、绿氢的碳排放差异、蒸汽甲烷重整制氢的核算方法、电解水制氢的间接排放处理、氢气产品的CN编码分类。'
  },
  {
    id: 8,
    title: '电力出口CBAM处理方案',
    summary: '电力作为特殊商品的CBAM机制及对电力贸易的影响分析。',
    category: '行业专项',
    targetAudience: ['电力企业', '能源贸易', '跨境交易'],
    relatedSectors: ['电力'],
    tags: ['电力', '能源贸易', '跨境'],
    content: '电力在CBAM中具有特殊地位。本指南解析：电力进口的CBAM计算方法、与电力联网国的特殊安排、电力碳强度的确定方式、可再生能源电力的CBAM认定。'
  },
  {
    id: 9,
    title: 'CBAM碳核算方法论：四种方法详解',
    summary: '系统介绍CBAM认可的四种碳排放核算方法及其适用场景。',
    category: '碳核算',
    targetAudience: ['碳排放工程师', '技术顾问', '审核人员'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['碳核算', '方法论', 'EU方法'],
    content: 'CBAM认可四种核算方法：欧盟方法、国际标准、国家方法、企业方法。本指南详细对比各种方法的：适用条件与限制、数据要求差异、计算复杂度、审核认可度、选择建议。'
  },
  {
    id: 10,
    title: 'CBAM默认值使用指南',
    summary: '何时使用默认值、默认值的来源与更新、使用默认值的风险分析。',
    category: '碳核算',
    targetAudience: ['申报人员', '风险控制', '供应链管理'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['默认值', '风险控制', '过渡期'],
    content: '默认值是过渡期的重要工具。本指南涵盖：默认值的计算依据、各国产品默认值差异、使用默认值的成本与风险、从默认值过渡到实际值的时间规划。'
  },
  {
    id: 11,
    title: '简单产品与复杂产品CBAM处理差异',
    summary: '区分简单产品和复杂产品的核算方法及申报要求。',
    category: '碳核算',
    targetAudience: ['技术团队', '产品管理', '供应链'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥'],
    tags: ['产品分类', '简单产品', '复杂产品'],
    content: 'CBAM对简单产品和复杂产品有不同的核算规则。本指南说明：简单产品的定义与核算方法、复杂产品的嵌套排放计算、前体物质的CBAM处理、典型案例分析。'
  },
  {
    id: 12,
    title: '间接排放核算：电力与热力的处理',
    summary: 'CBAM中间接排放的计算方法、电力排放因子选择与热力核算。',
    category: '碳核算',
    targetAudience: ['能源管理', '碳排放工程师', '设备部门'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '氢气'],
    tags: ['间接排放', '电力', '热力'],
    content: '间接排放是CBAM核算的重要组成部分。本指南详解：间接排放的核算边界、电力排放因子的确定、热力消耗的排放计算、自发电与外购电的处理差异。'
  },
  {
    id: 13,
    title: 'CBAM申报系统操作全流程',
    summary: '欧盟CBAM门户系统注册、授权、申报的完整操作指南。',
    category: '申报系统',
    targetAudience: ['申报专员', 'IT支持', '合规部门'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['系统操作', '门户', '申报流程'],
    content: '本指南提供CBAM门户系统的详细操作说明：账户注册与角色设置、授权代表委任流程、申报界面功能介绍、数据录入与校验、常见系统问题排查。'
  },
  {
    id: 14,
    title: 'CBAM证书购买与支付流程',
    summary: '正式期CBAM证书的价格机制、购买流程及财务管理建议。',
    category: '申报系统',
    targetAudience: ['财务部门', '资金管理', '合规负责人'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['证书', '支付', '财务管理'],
    content: 'CBAM证书是正式期的核心机制。本指南说明：证书价格与欧盟碳价的关系、购买时机与策略、证书有效期与结转、财务规划建议。'
  },
  {
    id: 15,
    title: 'CBAM授权代表委任指南',
    summary: '非欧盟企业如何委任授权代表在欧盟完成CBAM申报。',
    category: '申报系统',
    targetAudience: ['法务部门', '外贸管理', '合规团队'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['授权代表', '委任', '合规'],
    content: '非欧盟企业必须委任授权代表。本指南涵盖：授权代表的资格要求、委任流程与文件、授权范围与限制、责任划分与风险控制。'
  },
  {
    id: 16,
    title: 'CBAM数据收集与供应链协作',
    summary: '建立CBAM数据收集体系，推动供应链上下游数据共享。',
    category: '申报系统',
    targetAudience: ['供应链管理', '采购部门', '数据管理'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥'],
    tags: ['数据收集', '供应链', '协作'],
    content: '有效的数据收集是CBAM合规的基础。本指南提供：数据收集清单与模板、供应商数据要求、数据质量保证措施、供应链数据共享机制。'
  },
  {
    id: 17,
    title: 'CBAM合规成本测算与优化',
    summary: 'CBAM对企业成本的影响分析及优化策略。',
    category: '战略规划',
    targetAudience: ['财务总监', '战略规划', '企业高管'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['成本测算', '财务影响', '优化策略'],
    content: 'CBAM将显著影响企业成本结构。本指南帮助您：估算CBAM年度成本、分析成本影响因素、制定成本优化策略、评估定价调整方案。'
  },
  {
    id: 18,
    title: 'CBAM背景下的低碳转型战略',
    summary: '以CBAM为契机推动企业低碳转型，提升长期竞争力。',
    category: '战略规划',
    targetAudience: ['企业高管', '战略部门', '可持续发展'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['低碳转型', '战略规划', '可持续发展'],
    content: 'CBAM既是挑战也是机遇。本指南探讨：低碳技术路线选择、减排投资回报分析、绿色产品差异化战略、碳管理能力建设。'
  },
  {
    id: 19,
    title: 'CBAM与碳关税政策的国际比较',
    summary: '分析全球碳关税政策趋势，把握国际贸易新格局。',
    category: '战略规划',
    targetAudience: ['政策研究', '国际业务', '战略规划'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['国际政策', '碳关税', '贸易格局'],
    content: '碳关税正在成为全球趋势。本指南比较：各国碳边境调节政策进展、不同机制的差异分析、对中国出口的综合影响、应对策略建议。'
  },
  {
    id: 20,
    title: 'CBAM审核与核查要求',
    summary: 'CBAM数据的核查要求、认可机构及应对策略。',
    category: '申报系统',
    targetAudience: ['审核人员', '质量管理', '技术团队'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['核查', '审核', '认证机构'],
    content: '正式期CBAM数据需经核查。本指南说明：核查范围与要求、认可的核查机构、核查流程与时间安排、常见问题与应对。'
  },
  {
    id: 21,
    title: '出口欧盟报关与CBAM申报衔接',
    summary: 'CBAM申报与海关报关的关联与协调操作。',
    category: '申报系统',
    targetAudience: ['报关员', '外贸单证', '物流管理'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '氢气'],
    tags: ['报关', '海关', '单证'],
    content: 'CBAM申报与海关报关紧密关联。本指南详解：CBAM申报与报关的时间协调、数据一致性要求、申报编号关联、异常情况处理。'
  },
  {
    id: 22,
    title: '中小企业CBAM合规简化方案',
    summary: '为中小企业量身定制的CBAM合规低成本解决方案。',
    category: '战略规划',
    targetAudience: ['中小企业', '管理者', '业务负责人'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥'],
    tags: ['中小企业', '简化方案', '低成本'],
    content: '中小企业面临更多CBAM挑战。本指南提供：简化合规流程、资源优化配置、外包服务选择建议、分阶段实施路径。'
  },
  {
    id: 23,
    title: 'CBAM常见错误与避坑指南',
    summary: '汇总CBAM申报中的常见错误，提供预防措施与解决方案。',
    category: '申报系统',
    targetAudience: ['申报人员', '质量审核', '风险管理'],
    relatedSectors: ['钢铁', '水泥', '铝', '化肥', '电力', '氢气'],
    tags: ['常见错误', '风险预防', '最佳实践'],
    content: '本指南汇总过渡期内企业常犯错误：数据来源不合规、核算边界错误、单位换算失误、时间节点遗漏等，并提供预防措施和纠错方案。'
  }
];

// 分类列表
const categories = ['全部', '基础认知', '碳核算', '申报系统', '行业专项', '战略规划'] as const;

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // 筛选后的指南列表
  const filteredGuides = useMemo(() => {
    return guidesData.filter(guide => {
      const matchesCategory = selectedCategory === '全部' || guide.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        guide.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">CBAM 合规指南中心</h1>
          <p className="text-center mt-4 text-slate-300 text-lg">
            全面解析欧盟碳边境调节机制，助力企业合规出海
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="搜索指南标题、标签或摘要..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* 分类筛选标签 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 结果统计 */}
        <div className="mb-6 text-gray-600 text-sm">
          共找到 <span className="font-semibold text-slate-800">{filteredGuides.length}</span> 篇指南
        </div>

        {/* 指南卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* 卡片主体 */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleExpand(guide.id)}
              >
                {/* 分类标签 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                    {guide.category}
                  </span>
                </div>

                {/* 标题 */}
                <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2 hover:text-slate-600">
                  {guide.title}
                </h3>

                {/* 摘要 */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {guide.summary}
                </p>

                {/* 目标受众标签 */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {guide.targetAudience.slice(0, 2).map((audience) => (
                    <span
                      key={audience}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
                    >
                      {audience}
                    </span>
                  ))}
                </div>

                {/* 行业标签 */}
                <div className="flex flex-wrap gap-1.5">
                  {guide.relatedSectors.slice(0, 3).map((sector) => (
                    <span
                      key={sector}
                      className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded"
                    >
                      {sector}
                    </span>
                  ))}
                </div>

                {/* 展开指示器 */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-slate-500 text-sm">
                    {expandedId === guide.id ? '收起详情' : '点击展开'}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      expandedId === guide.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* 展开的详情区域 */}
              {expandedId === guide.id && (
                <div className="px-6 pb-6 bg-slate-50 border-t border-gray-100 animate-fadeIn">
                  <div className="pt-4">
                    <h4 className="font-semibold text-slate-800 mb-2">详细内容</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {guide.content}
                    </p>

                    {/* 相关标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        下载PDF
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        分享
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-lg">未找到匹配的指南</p>
            <p className="text-gray-400 text-sm mt-2">请尝试其他关键词或分类</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
