"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, AlertOctagon, RefreshCw, FileText, ChevronDown, Search } from "lucide-react";
import Link from "next/link";

// --- Types ---
type StepType = 'question' | 'input' | 'result';
type RiskLevel = 'safe' | 'low' | 'medium' | 'high';

interface Option {
  label: string;
  nextId: string;
}

interface ResultData {
  riskLevel: RiskLevel;
  title: string;
  summary: string;
  actions: { text: string; urgent?: boolean }[];
  guides: { title: string; id: string }[];
  faqs: { q: string; a: string }[];
}

interface Step {
  id: string;
  type: StepType;
  question?: string;
  options?: Option[];
  resultData?: ResultData;
}

// --- Inline Data ---
const CN_CODES_MOCK = [
  { code: "7201", desc: "生铁及镜铁" },
  { code: "7208", desc: "铁或非合金钢平板轧材" },
  { code: "7301", desc: "钢铁板桩" },
  { code: "7601", desc: "未锻轧铝" },
  { code: "2523", desc: "水泥" },
  { code: "3102", desc: "矿物氮肥或化学氮肥" },
];

const STEPS: Record<string, Step> = {
  start: {
    id: "start",
    type: "question",
    question: "您的企业是否直接或间接向欧盟（EU）27国出口商品？",
    options: [
      { label: "是，有直接出口业务", nextId: "category" },
      { label: "是，通过中间商出口", nextId: "category" },
      { label: "否，仅在国内销售", nextId: "result_safe" },
    ],
  },
  category: {
    id: "category",
    type: "question",
    question: "您的主要出口商品属于以下哪类？",
    options: [
      { label: "钢铁 (Iron & Steel)", nextId: "q2b_cn_check" },
      { label: "铝 (Aluminium)", nextId: "q2b_cn_check" },
      { label: "水泥 (Cement)", nextId: "q2b_cn_check" },
      { label: "化肥 (Fertilisers)", nextId: "q2b_cn_check" },
      { label: "电力 / 氢 (Electricity / Hydrogen)", nextId: "process_check" },
      { label: "其他商品 (纺织、机械、电子等)", nextId: "result_low" },
    ],
  },
  q2b_cn_check: {
    id: "q2b_cn_check",
    type: "input",
    question: "请输入商品的海关编码（CN Code / HS Code）前4位以确认：",
    // logic handled in component
  },
  process_check: {
    id: "process_check",
    type: "question",
    question: "该产品在生产过程中是否产生直接碳排放？",
    options: [
      { label: "是，有熔炼/燃烧过程", nextId: "result_high" },
      { label: "否，主要是物理加工", nextId: "result_medium" },
    ],
  },
  // --- Results ---
  result_safe: {
    id: "result_safe",
    type: "result",
    resultData: {
      riskLevel: "safe",
      title: "暂无 CBAM 风险",
      summary: "根据您的回答，您的业务目前不涉及向欧盟出口，因此不受 CBAM 规制影响。",
      actions: [
        { text: "持续关注欧盟市场动态" },
        { text: "若未来计划拓展欧盟业务，请重新评估" },
      ],
      guides: [],
      faqs: [],
    },
  },
  result_low: {
    id: "result_low",
    type: "result",
    resultData: {
      riskLevel: "low",
      title: "低风险 / 暂未纳入",
      summary: "您的产品类别目前尚未在 CBAM 首批征收名单（钢铁、铝、水泥、化肥、电力、氢）中。",
      actions: [
        { text: "关注 2026 年后的扩容计划（可能包含聚合物、有机化学品等）" },
        { text: "建立初步的碳足迹核算意识" },
      ],
      guides: [{ title: "CBAM 未来扩容路线图", id: "G05" }],
      faqs: [{ q: "我的产品什么时候会被纳入？", a: "欧盟计划在2030年前将所有ETS覆盖的行业纳入CBAM。" }],
    },
  },
  result_medium: {
    id: "result_medium",
    type: "result",
    resultData: {
      riskLevel: "medium",
      title: "中等风险 - 需申报",
      summary: "您的产品属于 CBAM 覆盖范围，虽然直接排放可能较低，但仍需在过渡期内履行季度报告义务。",
      actions: [
        { text: "注册 CBAM 过渡期登记系统", urgent: true },
        { text: "收集简单的生产数据用于季度申报" },
        { text: "联系欧盟进口商确认申报责任" },
      ],
      guides: [
        { title: "如何填写 CBAM 季度报告", id: "G02" },
        { title: "简单加工品的排放计算规则", id: "G03" },
      ],
      faqs: [
        { q: "我不申报会有罚款吗？", a: "是的，未履行报告义务可能导致每吨未报告排放量 10-50 欧元的罚款。" },
      ],
    },
  },
  result_high: {
    id: "result_high",
    type: "result",
    resultData: {
      riskLevel: "high",
      title: "高风险 - 重点合规对象",
      summary: "您的产品属于 CBAM 核心管控范围且涉及直接排放。自2026年起需购买 CBAM 证书，过渡期需严格申报。",
      actions: [
        { text: "立即启动组织层面碳盘查 (ISO 14064)", urgent: true },
        { text: "建立产品碳足迹 (PCF) 核算体系", urgent: true },
        { text: "与欧盟客户沟通碳成本分摊机制", urgent: true },
        { text: "准备 CBAM 过渡期季度数据报告" },
      ],
      guides: [
        { title: "CBAM 钢铁/铝行业计算详则", id: "G01" },
        { title: "默认值的使用限制与实测数据要求", id: "G04" },
      ],
      faqs: [
        { q: "国内已付的碳价可以抵扣吗？", a: "可以。如果在原产国（中国）已经支付了碳价，可以申请相应抵扣，但需提供完税证明。" },
        { q: "什么是直接排放和间接排放？", a: "直接排放指生产过程本身产生的温室气体；间接排放主要指外购电力消耗产生的排放。" },
        { q: "何时开始正式收费？", a: "2026年1月1日正式实施收费，2023-2025年为过渡期，仅需报告数据。" },
      ],
    },
  },
};

export default function AssessmentPage() {
  const [currentStepId, setCurrentStepId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const [cnInput, setCnInput] = useState("");
  const [cnMatch, setCnMatch] = useState<{ code: string; desc: string } | null>(null);

  const currentStep = STEPS[currentStepId];

  // Logic: Calculate Progress (Very rough approximation based on depth)
  const progress = Math.min((history.length / 4) * 100, 100);

  const handleNext = (nextId: string) => {
    setHistory([...history, currentStepId]);
    setCurrentStepId(nextId);
    setCnInput("");
    setCnMatch(null);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentStepId(prev);
  };

  const checkCnCode = (val: string) => {
    setCnInput(val);
    if (val.length >= 4) {
      const found = CN_CODES_MOCK.find(c => val.startsWith(c.code));
      setCnMatch(found || null);
    } else {
      setCnMatch(null);
    }
  };

  const handleCnNext = () => {
    // Demo Logic: If matched, assume high risk flow, else manual check flow (process_check)
    if (cnMatch) {
      handleNext("process_check");
    } else {
      // Even if not matched in mock list, let them proceed for demo
      handleNext("process_check");
    }
  };

  const restart = () => {
    setCurrentStepId("start");
    setHistory([]);
    setCnInput("");
  };

  // --- Render Result View ---
  if (currentStep.type === 'result' && currentStep.resultData) {
    const { riskLevel, title, summary, actions, guides, faqs } = currentStep.resultData;
    
    const colors = {
      safe: "bg-emerald-100 text-emerald-800 border-emerald-200",
      low: "bg-blue-100 text-blue-800 border-blue-200",
      medium: "bg-amber-100 text-amber-800 border-amber-200",
      high: "bg-red-100 text-red-800 border-red-200",
    };
    
    const badgeColors = {
      safe: "bg-emerald-500",
      low: "bg-blue-500",
      medium: "bg-amber-500",
      high: "bg-red-500",
    };

    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Result Header */}
            <div className={`p-8 border-b ${colors[riskLevel]} bg-opacity-30`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`${badgeColors[riskLevel]} text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider`}>
                  {riskLevel === 'high' ? '高风险' : riskLevel === 'medium' ? '中风险' : riskLevel === 'low' ? '低风险' : '无风险'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
              <p className="text-slate-700 text-lg">{summary}</p>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Action List */}
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-brand-600" /> 建议行动清单
                  </h2>
                  <ul className="space-y-3">
                    {actions.map((action, idx) => (
                      <li key={idx} className={`p-4 rounded-lg border flex items-start gap-3 ${action.urgent ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                        <span className="font-mono text-slate-400 text-sm mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                        <span className={action.urgent ? 'font-medium text-red-900' : 'text-slate-700'}>
                          {action.text}
                          {action.urgent && <span className="ml-2 inline-block text-xs bg-red-200 text-red-800 px-1.5 rounded">⚡ 优先</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* FAQ */}
                <section>
                   <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <AlertOctagon className="text-brand-600" /> 常见问题
                  </h2>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <details key={idx} className="group border border-slate-200 rounded-lg open:bg-slate-50">
                        <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-slate-900">
                          {faq.q}
                          <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180 text-slate-400" />
                        </summary>
                        <div className="px-4 pb-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar Guides */}
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText size={18} /> 推荐指南
                  </h3>
                  <div className="space-y-3">
                    {guides.map((g, idx) => (
                      <Link href="#" key={idx} className="block text-sm text-brand-600 hover:text-brand-800 hover:underline">
                        📄 {g.title}
                      </Link>
                    ))}
                    {guides.length === 0 && <p className="text-sm text-slate-400">暂无特定指南。</p>}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <button 
                      onClick={restart}
                      className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-brand-600 text-sm font-medium transition-colors"
                    >
                      <RefreshCw size={16} /> 重新评估
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Wizard Step ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        {/* Header/Progress */}
        <div className="bg-brand-950 p-6 text-white relative">
          <div className="flex justify-between items-center mb-4">
            {history.length > 0 ? (
              <button onClick={handleBack} className="text-brand-200 hover:text-white flex items-center gap-1 text-sm transition-colors">
                <ArrowLeft size={16} /> 返回上一步
              </button>
            ) : (
              <div />
            )}
            <span className="text-xs font-mono text-brand-400">STEP {history.length + 1}</span>
          </div>
          <div className="h-1.5 w-full bg-brand-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow p-8 md:p-12 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">
            {currentStep.question}
          </h2>

          <div className="space-y-4">
            {currentStep.type === 'question' && currentStep.options?.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleNext(opt.nextId)}
                className="w-full text-left p-5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50 hover:shadow-md transition-all group flex justify-between items-center"
              >
                <span className="font-medium text-slate-700 group-hover:text-brand-900">{opt.label}</span>
                <ArrowRight className="text-slate-300 group-hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" size={20} />
              </button>
            ))}

            {currentStep.type === 'input' && (
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    value={cnInput}
                    onChange={(e) => checkCnCode(e.target.value)}
                    placeholder="例如: 7208 (钢铁轧材)..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-brand-500 focus:outline-none text-lg"
                    maxLength={4}
                  />
                </div>
                
                {cnInput.length >= 4 && (
                  <div className={`p-4 rounded-lg border ${cnMatch ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} animate-in zoom-in-95 duration-200`}>
                    {cnMatch ? (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-emerald-600 mt-0.5" />
                        <div>
                          <p className="font-bold text-emerald-900">匹配成功</p>
                          <p className="text-emerald-700 text-sm">CN {cnMatch.code}: {cnMatch.desc}</p>
                          <p className="text-emerald-600 text-xs mt-1">该编码属于 CBAM 重点管控目录。</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-900">未在演示库中找到</p>
                          <p className="text-amber-700 text-sm">此编码可能不在首批管控名单中，或者请输入其他编码重试。</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleCnNext}
                  disabled={cnInput.length < 4}
                  className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-xl transition-colors mt-4"
                >
                  继续下一步
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
