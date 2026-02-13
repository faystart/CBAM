import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./，提供专业的合规建议。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="bg-brand-950 text-white sticky top-0 z-50 border-b border-brand-800 shadow-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
              <span className="bg-brand-500 w-8 h-8 rounded flex items-center justify-center text-white">C</span>
              CBAM 指南
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-white transition-colors">首页</Link>
              <Link href="/assessment" className="hover:text-white transition-colors text-brand-400">自评工具</Link>
              <Link href="#" className="hover:text-white transition-colors">合规指南</Link>
              <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
            </nav>
            <Link 
              href="/assessment" 
              className="md:hidden bg-brand-600 px-3 py-1 rounded text-xs font-bold"
            >
              自评
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2 text-sm">
              © {new Date().getFullYear()} CBAM Guide. All rights reserved.
            </p>
            <p className="text-xs max-w-2xl mx-auto opacity-70">
              免责声明：本工具提供的结果仅供参考，不构成法律建议。具体合规义务请以欧盟 EUR-Lex 官方公报及相关法律文件为准。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
