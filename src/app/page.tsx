import Link from "next/link";
import { ArrowRight, Globe, Factory, Calendar, ShieldCheck } from "lucide-react";

export default function Home() {
  const industries = [
    { name: "水泥", icon: "🏗️" },
    { name: "钢铁", icon: "🔩" },
    { name: "铝", icon: "🥫" },
    { name: "化肥", icon: "🌾" },
    { name: "电力", icon: "⚡" },
    { name: "氢", icon: "🧪" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-brand-950 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-900/20 skew-x-12 transform translate-x-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-900 border border-brand-700 text-brand-300 text-xs font-semibold tracking-wide mb-6">
            欧盟碳边境调节机制 (CBAM)
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            您的产品出口欧盟吗？<br />
            <span className="text-brand-400">3分钟了解对您的影响</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            通过我们的智能向导，快速评估您的企业是否属于 CBAM 管辖范围，并获取定制化的合规建议。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/assessment" 
              className="bg-brand-500 hover:bg-brand-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              立即自评 <ArrowRight size={20} />
            </Link>
            <button className="bg-transparent border border-slate-600 hover:bg-slate-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 -mt-24 relative z-20">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-brand-500">
              <div className="bg-brand-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-brand-600">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">什么是 CBAM？</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                欧盟针对特定进口产品征收的碳关税，旨在防止“碳泄漏”，确保欧盟气候政策的有效性。
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-emerald-500">
              <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                <Factory size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">谁需要关注？</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                向欧盟出口钢铁、铝、水泥、化肥、电力或氢气的生产商及贸易商是主要的合规主体。
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-amber-500">
              <div className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">关键时间节点</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                过渡期已于2023年10月开始。<strong>2026年1月1日</strong>将正式实施并开始征收费用。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">六大受影响行业</h2>
          <p className="text-slate-500 mb-12">首批纳入 CBAM 征收范围的重点领域</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((ind, idx) => (
              <div key={idx} className="group p-6 rounded-xl bg-slate-50 hover:bg-brand-50 transition-colors border border-slate-100 hover:border-brand-200">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{ind.icon}</div>
                <div className="font-semibold text-slate-700 group-hover:text-brand-700">{ind.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
