import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
  const { url } = usePage();

  return (
    <aside className="w-[280px] bg-sidebar h-screen flex flex-col justify-between py-8 px-6 border-r border-card-border sticky top-0 shrink-0">
      <div>
        <h1 className="text-text-heading font-bold text-[1.1rem] mb-8 tracking-tight">snewstudio.dev</h1>
        <nav className="flex flex-col gap-1 -ml-2">
          <Link href="/" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${url === '/' ? 'bg-[#2a2a35] text-text-heading' : 'text-text-muted hover:text-text-heading hover:bg-[#202028]'}`}>
            <span className="text-lg">🧑‍💻</span>
            <span className="font-medium text-[0.9rem]">About</span>
          </Link>
          <Link href="/projects" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${url === '/projects' ? 'bg-[#2a2a35] text-text-heading' : 'text-text-muted hover:text-text-heading hover:bg-[#202028]'}`}>
            <span className="text-lg">📁</span>
            <span className="font-medium text-[0.9rem]">Projects</span>
          </Link>
          <Link href="/career" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${url === '/career' ? 'bg-[#2a2a35] text-text-heading' : 'text-text-muted hover:text-text-heading hover:bg-[#202028]'}`}>
            <span className="text-lg">💼</span>
            <span className="font-medium text-[0.9rem]">Career</span>
          </Link>
          <Link href="/certifications" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${url === '/certifications' ? 'bg-[#2a2a35] text-text-heading' : 'text-text-muted hover:text-text-heading hover:bg-[#202028]'}`}>
            <span className="text-lg">📜</span>
            <span className="font-medium text-[0.9rem]">Certifications</span>
          </Link>
          <Link href="/education" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${url === '/education' ? 'bg-[#2a2a35] text-text-heading' : 'text-text-muted hover:text-text-heading hover:bg-[#202028]'}`}>
            <span className="text-lg">🎓</span>
            <span className="font-medium text-[0.9rem]">Education</span>
          </Link>
        </nav>
      </div>

      <div>
        <div className="flex gap-5 mb-6 border-t border-[#1f2029] pt-6 pb-2">
          <a href="#" className="text-[#888893] hover:text-text-heading transition-colors">
            {/* Mail Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </a>
          <a href="#" className="text-[#888893] hover:text-text-heading transition-colors">
            {/* GitHub Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </a>
          <a href="#" className="text-[#888893] hover:text-text-heading transition-colors">
            {/* LinkedIn Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href="#" className="text-[#888893] hover:text-text-heading transition-colors">
            {/* X Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
          </a>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a21] rounded-full text-xs font-medium text-text-muted hover:text-text-heading transition-colors border border-card-border mb-6">
          <span className="text-sm">🌙</span>
          <span>Dark</span>
          <span className="text-[10px] ml-1 bg-[#101015] px-1.5 py-0.5 rounded border border-[#262631] text-[#6b6b77]">DARK</span>
        </button>
        <p className="text-[0.75rem] text-[#6b6b77]">© 2026 snewstudio.dev</p>
      </div>
    </aside>
  )
}
