import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { LayoutGrid, Sparkles } from 'lucide-react';
import StudioLink from '@/Components/Studio/StudioLink';
import { sections } from '@/data/sections';
import { easeOutExpo } from '@/lib/motion';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

export default function StudioHeader({ path }) {
    const active = sections.find((section) => path.startsWith(section.href));
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    // Only re-renders when crossing the threshold, not on every scroll frame.
    useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: easeOutExpo } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            className={`sticky top-0 z-30 border-b transition-colors duration-500 ${scrolled ? 'border-white/[0.06] bg-ink/80 backdrop-blur-md' : 'border-transparent'}`}
        >
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                <StudioLink
                    href="/menu"
                    aria-label="SNEWSTUDIO, main menu"
                    className={`group flex items-center gap-2.5 rounded-xl ${focusRing}`}
                >
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] font-display text-sm font-bold text-snow transition-transform duration-500 ease-out-expo group-hover:-rotate-12">
                        S
                    </span>
                    <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight text-snow sm:block">
                        snewstudio<span className="text-fog">.dev</span>
                    </span>
                </StudioLink>

                {active && (
                    <nav aria-label="Sections" className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/60 p-1">
                        {sections.map((section) => {
                            const isActive = section.key === active.key;
                            const Icon = section.icon;

                            return (
                                <StudioLink
                                    key={section.key}
                                    href={section.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={section.title}
                                    className={`relative isolate flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-full px-2.5 text-sm font-medium transition-colors duration-300 lg:px-4 ${isActive ? 'text-snow' : 'text-fog hover:text-snow'} ${focusRing}`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="studio-nav-active"
                                            className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                                    <span className="sr-only lg:not-sr-only">{section.short}</span>
                                </StudioLink>
                            );
                        })}
                    </nav>
                )}

                {active ? (
                    <StudioLink
                        href="/menu"
                        className={`group flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/10 px-3 text-sm font-medium text-fog transition-colors duration-300 hover:border-white/25 hover:text-snow sm:px-4 ${focusRing}`}
                    >
                        <LayoutGrid aria-hidden="true" className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-90" strokeWidth={1.75} />
                        <span className="sr-only sm:not-sr-only">Menu</span>
                    </StudioLink>
                ) : (
                    <StudioLink
                        href="/"
                        className={`group flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-fog transition-colors duration-300 hover:border-white/25 hover:text-snow ${focusRing}`}
                    >
                        <Sparkles aria-hidden="true" className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.75} />
                        Replay intro
                    </StudioLink>
                )}
            </div>
        </motion.header>
    );
}
