'use client';

import { useState, useMemo } from 'react';

// FAQ数据类型定义
interface FAQ {
  id: number;
  question: string;
  answer: string;
  tags: string[];
  category: '基础概念' | '责任主体' | '核算细节' | '申报系统';
}

// 内联全部30条FAQ数据
const faqData: FAQ[] = [
  // 基础概念 (8条)
  {
    id: 1,
    question: '什么是CBAM？它的全称是什么？',
    answer: 'CBAM是Carbon Border Adjustment Mechanism的缩写，中文译为"碳边境调节机制"。它是欧盟于2023年10月1日正式启动的一项政策工具，旨在对进口到欧盟的特定碳密集型产品征收碳费用，以防止"碳泄漏"并推动全球碳减排。CBAM是欧盟"Fit for 55"气候政策包的重要组成部分，目标是到2030年将欧盟的温室气体排放量在1990年基础上减少至少55%。',
    tags: ['CBAM定义', '基础知识', '欧盟政策'],
    category: '基础概念'
  },
  {
    id: 2,
    question: 'CBAM覆盖哪些产品？',
    answer: 'CBAM目前覆盖六大类产品：钢铁、铝、水泥、化肥、电力和氢气。具体来说，钢铁包括铁、钢及部分钢铁制品；铝包括未锻轧铝及铝制品；水泥包括熟料、水泥等；化肥包括氨、硝酸、硫酸铵等；电力包括进口的电能；氢气包括氢及下游产品。这些产品的选择基于其在欧盟碳排放交易体系（EU ETS）中的碳强度和碳泄漏风险。欧盟委员会将在2025年底前评估是否将 CBAM 范围扩展到其他行业。',
    tags: ['覆盖范围', '产品类别', '六大行业'],
    category: '基础概念'
  },
  {
    id: 3,
    question: 'CBAM的实施时间表是怎样的？',
    answer: 'CBAM分两个阶段实施：过渡期（2023年10月1日至2025年12月31日）和正式期（2026年1月1日起）。过渡期内，进口商只需按季度申报进口产品的碳排放数据，无需购买CBAM证书。每季度申报截止日期为次月最后一日。正式期开始后，进口商不仅要申报碳排放数据，还需要购买相应数量的CBAM证书。2026年至2034年间，免费配额将逐步取消，CBAM证书购买比例逐年增加。',
    tags: ['时间表', '过渡期', '正式期'],
    category: '基础概念'
  },
  {
    id: 4,
    question: 'CBAM证书是什么？如何定价？',
    answer: 'CBAM证书是进口商在正式期必须购买的碳费用凭证。每张证书代表1吨二氧化碳当量的排放。证书价格以欧盟排放交易体系（EU ETS）的周平均拍卖价格为基础计算，每周更新一次。进口商需要在每年5月31日前购买足额证书并上交，也可在6月30日前回购多余的证书（按购买价格）。证书不能跨年度结转使用。',
    tags: ['证书', '价格机制', 'EU ETS'],
    category: '基础概念'
  },
  {
    id: 5,
    question: 'CBAM与欧盟碳市场（EU ETS）有什么关系？',
    answer: 'CBAM与EU ETS紧密关联：1）CBAM旨在消除欧盟内外生产者的碳成本差异，确保进口产品承担与欧盟本土产品相当的碳费用；2）CBAM证书价格与EU ETS碳价挂钩；3）EU ETS中的免费配额将逐步取消（2026-2034年），CBAM将逐步替代免费配额；4）两者的核算方法和监测要求高度一致。简单理解，CBAM是EU ETS在进口产品上的延伸。',
    tags: ['EU ETS', '碳市场', '免费配额'],
    category: '基础概念'
  },
  {
    id: 6,
    question: '什么是"碳泄漏"？CBAM如何防止碳泄漏？',
    answer: '碳泄漏是指企业因严格的气候政策（如碳定价）将生产转移到气候政策较宽松的国家，导致全球总排放量反而增加的现象。CBAM通过以下方式防止碳泄漏：1）对进口产品征收与欧盟本土产品相当的碳费用，消除"碳套利"动机；2）鼓励出口国采取等效的碳定价措施；3）推动全球碳定价体系的建立。CBAM符合WTO规则，被视为防止碳泄漏的边境措施。',
    tags: ['碳泄漏', '政策目的', '全球减排'],
    category: '基础概念'
  },
  {
    id: 7,
    question: 'CBAM对非欧盟出口商有什么影响？',
    answer: '对非欧盟出口商的影响包括：1）成本增加：出口产品需承担额外碳费用，可能降低价格竞争力；2）数据要求：需向欧盟进口商提供碳排放数据，增加合规负担；3）技术压力：可能需要升级低碳技术以降低排放；4）市场风险：可能影响出口量或被迫降价；5）转型机遇：提前布局低碳转型可获得竞争优势。中国作为欧盟重要贸易伙伴，钢铁、铝、化肥等行业受影响较大。',
    tags: ['出口影响', '成本分析', '竞争力'],
    category: '基础概念'
  },
  {
    id: 8,
    question: '哪些国家可以豁免CBAM？',
    answer: '以下国家和地区的出口可豁免CBAM：1）欧盟成员国及欧洲经济区国家（冰岛、列支敦士登、挪威）；2）与欧盟建立碳市场链接的国家（目前为瑞士）；3）欧盟碳市场海外领土；4）联合国最不发达国家名单中的国家（目前暂不适用CBAM）。此外，如果出口国实施了与CBAM等效的碳定价机制并获欧盟认可，其出口产品可申请减免。',
    tags: ['豁免国家', '例外情况', '等效机制'],
    category: '基础概念'
  },
  // 责任主体 (6条)
  {
    id: 9,
    question: '谁需要承担CBAM申报义务？',
    answer: 'CBAM申报义务主体是欧盟进口商。具体而言，只有注册在欧盟境内的企业或个人才能成为CBAM申报人。进口商需要在欧盟CBAM门户系统注册账户，并获得成员国主管机关的授权。对于间接进口（如通过贸易商），最终进口到欧盟的企业仍需承担申报责任。非欧盟出口商虽不直接承担申报义务，但需配合进口商提供碳排放数据。',
    tags: ['进口商', '申报义务', '责任主体'],
    category: '责任主体'
  },
  {
    id: 10,
    question: '什么是授权代表？如何委任？',
    answer: '授权代表是受非欧盟生产商或出口商委托，在欧盟境内代为处理CBAM事务的人员或机构。委任程序包括：1）选择符合条件的授权代表（自然人或法人，注册在欧盟境内）；2）签署书面授权协议；3）在CBAM门户系统提交委任申请；4）获得成员国主管机关批准。授权代表可以代表委托方：提交申报、持有CBAM账户、与主管机关沟通、购买和上交CBAM证书等。',
    tags: ['授权代表', '委任流程', '非欧盟企业'],
    category: '责任主体'
  },
  {
    id: 11,
    question: '中国企业如何配合欧盟进口商完成CBAM申报？',
    answer: '中国企业作为出口商应做好以下配合工作：1）建立碳排放核算体系，按照CBAM方法计算产品碳足迹；2）准备并保存碳排放数据报告及相关证明材料；3）按进口商要求提供碳排放数据和必要文件；4）考虑获取第三方核查报告以提高数据可信度；5）在技术能力不足时，可寻求专业机构协助；6）与进口商保持沟通，及时响应数据更新需求。',
    tags: ['中国企业', '配合义务', '数据提供'],
    category: '责任主体'
  },
  {
    id: 12,
    question: 'CBAM违规会有什么后果？',
    answer: 'CBAM违规的后果包括：1）行政处罚：未按时申报或提供虚假信息，将面临罚款；2）证书追缴：未足额购买证书需补购并支付滞纳金；3）信用影响：违规记录将影响企业在欧盟的信用评级；4）贸易限制：严重违规可能导致进口许可被暂停或撤销；5）法律责任：故意逃避CBAM义务可能面临法律诉讼。各成员国将制定具体的处罚标准，处罚金额通常相当于未购买证书价格的3倍以上。',
    tags: ['违规后果', '处罚', '合规风险'],
    category: '责任主体'
  },
  {
    id: 13,
    question: '多家供应商的货物合并进口时如何处理？',
    answer: '当一批进口货物来自多家供应商时，处理方式如下：1）碳排放数据需按供应商/生产设施分别计算和申报；2）如果不同供应商的产品可物理区分，应分别申报；3）如果无法区分，需按混合比例或默认值估算；4）进口商需收集所有供应商的排放数据；5）建议在合同中明确各方的CBAM数据提供责任。实际操作中，建议尽量避免混合进口以简化合规流程。',
    tags: ['合并进口', '多供应商', '数据处理'],
    category: '责任主体'
  },
  {
    id: 14,
    question: '贸易商和中间商在CBAM中承担什么责任？',
    answer: '贸易商和中间商的CBAM责任取决于其角色：1）欧盟境内的贸易商如作为进口商，需承担完整申报义务；2）非欧盟贸易商需向下游买家提供碳排放数据；3）纯中间商（不持有货物所有权）不承担CBAM义务；4）建议在贸易合同中明确CBAM成本和数据责任的分配；5）欧盟进口商可要求供应链各方提供数据支持。贸易商应评估自身业务模式，确定CBAM责任边界。',
    tags: ['贸易商', '中间商', '责任划分'],
    category: '责任主体'
  },
  // 核算细节 (9条)
  {
    id: 15,
    question: 'CBAM认可的碳排放核算方法有哪些？',
    answer: 'CBAM认可四种核算方法：1）欧盟方法（EU Method）：最权威的方法，与EU ETS核算规则一致；2）国际标准方法：如ISO 14064系列、GHG Protocol等；3）国家方法：出口国认可的官方核算方法，需证明与欧盟方法等效；4）企业方法：企业自主研发的核算方法，需经认可机构审核批准。建议优先选择欧盟方法或国际标准方法以降低审核风险。',
    tags: ['核算方法', 'EU方法', '国际标准'],
    category: '核算细节'
  },
  {
    id: 16,
    question: '什么是简单产品和复杂产品？如何区分？',
    answer: '简单产品是指生产过程中不使用CBAM覆盖产品作为投入物的产品。复杂产品是指生产过程中使用了一个或多个CBAM覆盖产品（前体）作为投入物的产品。区分意义在于：简单产品只需计算直接排放和间接排放；复杂产品还需计算嵌入的前体排放。例如：电解铝是简单产品，铝合金型材因使用了铝锭作为投入物，属于复杂产品。',
    tags: ['简单产品', '复杂产品', '产品分类'],
    category: '核算细节'
  },
  {
    id: 17,
    question: '什么是默认值？何时可以使用？',
    answer: '默认值是欧盟为各类CBAM产品设定的碳排放强度参考值。使用场景包括：1）过渡期内，可使用默认值替代实际数据；2）实际数据无法获取时，可临时使用默认值；3）辅助数据缺失时的补充计算。注意事项：默认值通常高于实际排放均值（惩罚性设定），长期使用会增加CBAM成本；正式期后过度依赖默认值可能不被接受。建议企业尽快建立实际核算能力。',
    tags: ['默认值', '过渡期', '惩罚性设定'],
    category: '核算细节'
  },
  {
    id: 18,
    question: '如何计算电力消耗的间接排放？',
    answer: '电力间接排放计算步骤：1）确定电力消耗量（kWh）；2）选择适当的排放因子；3）排放量 = 电力消耗量 × 排放因子。排放因子选择优先级：a）实际电力来源的排放因子（如有绿证或PPA证明）；b）所在国电网平均排放因子；c）欧盟公布的默认排放因子。自发电与外购电分开计算，自发电的净输出电力可抵扣排放。',
    tags: ['电力排放', '间接排放', '排放因子'],
    category: '核算细节'
  },
  {
    id: 19,
    question: '前体排放是什么？如何计算？',
    answer: '前体是指用于生产复杂产品的CBAM覆盖物质，如生产钢材用的铁、生产铝材用的铝锭。前体排放是这些投入物中嵌入的碳排放量。计算方法：1）确定前体使用量；2）获取前体的碳排放强度（来自供应商或默认值）；3）前体排放 = 前体用量 × 前体碳强度。注意：如果前体在欧盟已支付碳费用或出口国已征收等效碳价，可申请扣除相应排放。',
    tags: ['前体排放', '复杂产品', '嵌入排放'],
    category: '核算细节'
  },
  {
    id: 20,
    question: 'CBAM的核算边界如何确定？',
    answer: 'CBAM核算边界包括：1）直接排放（范围1）：生产现场的燃料燃烧和工艺过程排放；2）间接排放（范围2）：外购电力、热力消耗对应的排放。核算边界遵循以下原则：a）以生产设施为边界；b）包含产品生产的所有相关工艺环节；c）辅助设施排放按比例分摊；d）排除非生产相关的排放。边界确定需要清晰的工艺流程图和物料平衡表。',
    tags: ['核算边界', '范围1', '范围2'],
    category: '核算细节'
  },
  {
    id: 21,
    question: '废钢和再生铝的碳排放如何计算？',
    answer: '废钢和再生铝作为回收材料，其处理方式：1）回收材料本身不带入碳排放（视为零碳输入）；2）回收处理过程的排放需计入；3）使用回收材料可显著降低产品碳强度；4）需证明回收材料的来源和处理量；5）电力炉炼钢（使用废钢）比高炉炼钢碳强度低60%以上；6）再生铝比电解铝碳强度低90%以上。鼓励企业使用回收材料以降低CBAM成本。',
    tags: ['废钢', '再生铝', '回收材料'],
    category: '核算细节'
  },
  {
    id: 22,
    question: '如何证明碳排放数据的真实性？',
    answer: '证明数据真实性的方法：1）建立完善的数据管理体系，保存原始记录；2）使用经认可的监测设备和方法；3）采用标准化的核算方法学；4）获取第三方核查报告；5）保留供应链数据证明（如供应商声明、能源账单等）；6）与历史数据和行业基准进行对比验证。正式期内，年度排放数据需要经认可机构核查。建议企业尽早建立符合ISO 14064的数据管理体系。',
    tags: ['数据真实性', '核查', '证明材料'],
    category: '核算细节'
  },
  {
    id: 23,
    question: '碳排放数据需要保存多久？',
    answer: '根据CBAM法规要求：1）排放数据及相关证明材料需保存至少10年；2）保存内容包括：监测报告、能源账单、物料平衡表、计算表格、核查报告等；3）可以电子或纸质形式保存；4）需确保数据可追溯、可审计；5）数据存储地点应在欧盟可访问的范围内；6）主管机关有权随时调阅检查。建议建立专门的数据归档系统，定期备份。',
    tags: ['数据保存', '归档要求', '合规期限'],
    category: '核算细节'
  },
  // 申报系统 (7条)
  {
    id: 24,
    question: '如何注册CBAM门户系统账户？',
    answer: 'CBAM门户系统注册步骤：1）访问EU Login系统，使用EU ID登录；2）进入CBAM门户；3）填写企业信息（名称、地址、税号等）；4）选择成员国的主管机关；5）提交授权代表信息（如适用）；6）等待主管机关审核批准；7）获得申报人身份后可开始操作。建议提前准备企业注册文件、税务信息和授权委托书。系统支持多用户角色管理。',
    tags: ['系统注册', 'EU Login', '账户申请'],
    category: '申报系统'
  },
  {
    id: 25,
    question: '过渡期季度申报需要提交哪些信息？',
    answer: '过渡期季度申报所需信息：1）进口商基本信息；2）进口货物的CN编码及数量；3）生产设施信息（名称、地址、所在国）；4）产品的直接排放量；5）产品的间接排放量（如适用）；6）前体排放量（复杂产品）；7）碳排放强度的计算方法；8）数据来源说明（实际值或默认值）。每季度申报截止日为次月最后一日，需在CBAM门户系统在线填报。',
    tags: ['季度申报', '过渡期', '数据要求'],
    category: '申报系统'
  },
  {
    id: 26,
    question: 'CBAM年度申报和季度申报有什么区别？',
    answer: '主要区别：1）周期不同：季度申报每季度一次，年度申报每年一次；2）内容深度：年度申报需提交更详细的数据和核查报告；3）适用阶段：季度申报主要在过渡期，年度申报在正式期；4）核查要求：年度数据需第三方核查，季度数据过渡期内暂不强制核查；5）截止日期：季度申报为次月末日，年度申报为次年5月31日。正式期将取消季度申报，改为年度申报。',
    tags: ['年度申报', '季度申报', '区别对比'],
    category: '申报系统'
  },
  {
    id: 27,
    question: 'CBAM申报中的CN编码是什么？如何确定？',
    answer: 'CN编码是欧盟"联合命名法"（Combined Nomenclature）的商品编码，用于海关税则和贸易统计。确定方法：1）根据产品名称、规格、用途在欧盟CN编码表中查找；2）参考报关单上的HS编码，通常CN编码与HS编码前6位相同；3）咨询报关行或海关专业人士；4）CBAM门户系统提供编码查询功能。注意：同一产品不同规格可能有不同编码，需准确匹配以确保申报正确。',
    tags: ['CN编码', '商品编码', 'HS编码'],
    category: '申报系统'
  },
  {
    id: 28,
    question: '正式期如何购买和上交CBAM证书？',
    answer: '正式期CBAM证书操作流程：1）在CBAM门户系统中查看应购证书数量；2）根据周平均碳价计算金额；3）通过系统支付购买证书；4）证书记入账户余额；5）每年5月31日前上交足额证书；6）多余证书可在6月30日前回购（按购买价退款）。注意：证书按购买时价格计价，不同批次价格可能不同；证书不能跨年使用；未按时上交将面临处罚。',
    tags: ['证书购买', '上交流程', '正式期'],
    category: '申报系统'
  },
  {
    id: 29,
    question: 'CBAM数据可以修改或补报吗？',
    answer: '数据修改和补报规则：1）过渡期内，可在截止日后2个月内修改申报数据；2）正式期允许有限度的修正，但需说明原因；3）如发现重大错误，应主动向主管机关报告并更正；4）补报或修改可能触发核查或审计；5）故意提供虚假信息的处罚不因后续更正而免除；6）建议在提交前仔细核对，避免频繁修改。系统保留所有修改记录以供审计。',
    tags: ['数据修改', '补报', '修正规则'],
    category: '申报系统'
  },
  {
    id: 30,
    question: '哪些机构可以核查CBAM排放数据？',
    answer: 'CBAM数据核查机构需满足以下条件：1）经欧盟成员国认可的核查机构；2）具备ISO 14065资质或同等能力认证；3）与被核查企业无利益冲突；4）核查人员具备相应专业能力。选择核查机构建议：a）优先选择有欧盟ETS核查经验的机构；b）考虑机构在相关行业的专业性；c）提前沟通核查范围和时间安排；d）了解核查费用和报告周期。欧盟将公布认可的核查机构名单。',
    tags: ['核查机构', '认证资质', 'ISO 14065'],
    category: '申报系统'
  }
];

// 分类列表
const categories = ['全部', '基础概念', '责任主体', '核算细节', '申报系统'] as const;

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // 筛选后的FAQ列表
  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesCategory = selectedCategory === '全部' || faq.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 高亮匹配文字
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-slate-900 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">常见问题解答</h1>
          <p className="text-center mt-4 text-slate-300 text-lg">
            CBAM合规过程中最常见问题的详细解答
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative">
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
              placeholder="搜索问题、答案或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
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
          共找到 <span className="font-semibold text-slate-800">{filteredFAQs.length}</span> 个相关问题
        </div>

        {/* FAQ列表 - 手风琴样式 */}
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* 问题头部 */}
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full px-6 py-5 flex items-start gap-4 text-left focus:outline-none focus:bg-slate-50"
              >
                {/* 展开/收起图标 */}
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  expandedId === faq.id ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>

                <div className="flex-1 min-w-0">
                  {/* 分类标签 */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      faq.category === '基础概念' ? 'bg-blue-100 text-blue-700' :
                      faq.category === '责任主体' ? 'bg-purple-100 text-purple-700' :
                      faq.category === '核算细节' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {faq.category}
                    </span>
                  </div>

                  {/* 问题文本 */}
                  <h3 className="text-base font-semibold text-slate-800 leading-relaxed">
                    {highlightText(faq.question, searchQuery)}
                  </h3>
                </div>
              </button>

              {/* 答案区域 - 手风琴展开 */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedId === faq.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  {/* 左侧蓝色边框 */}
                  <div className="flex gap-4">
                    <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      {/* 答案内容 */}
                      <div className="text-gray-600 text-sm leading-relaxed mb-4">
                        {highlightText(faq.answer, searchQuery)}
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                          >
                            #{highlightText(tag, searchQuery)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-lg">未找到匹配的问题</p>
            <p className="text-gray-400 text-sm mt-2">请尝试其他关键词或分类</p>
          </div>
        )}

        {/* 底部联系区域 */}
        <div className="mt-12 bg-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">没有找到答案？</h2>
          <p className="text-slate-300 mb-6">
            我们的专业团队随时为您提供CBAM合规咨询服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:cbam-support@example.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-800 font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              联系我们
            </a>
            <a
              href="/guides"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              查看指南中心
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
