import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SplitHeading } from '@/Components/Studio/SplitText';
import StudioLink from '@/Components/Studio/StudioLink';
import { menuSections } from '@/data/sections';
import { fadeUp, stagger, useRise } from '@/lib/motion';

const arrowKeys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

// Feeds the card's spotlight position through CSS variables, avoiding re-renders.
function trackSpotlight(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

function MenuCard({ section, index, rise }) {
    const Icon = section.icon;

    return (
        <motion.li
            variants={fadeUp(rise, 0.9)}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="h-full"
        >
            <StudioLink
                href={section.href}
                prefetch
                onPointerMove={trackSpotlight}
                className="group relative isolate flex h-full min-h-36 flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-raised/70 p-5 transition-colors duration-500 hover:border-transparent focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:min-h-60 sm:p-7 lg:min-h-80"
            >
                <span aria-hidden="true" className="studio-spotlight absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span aria-hidden="true" className="studio-gradient-border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />

                <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-snow transition duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 group-hover:border-accent/40 group-hover:text-accent group-focus-visible:text-accent">
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-snow transition duration-500 ease-out-expo group-hover:border-transparent group-hover:bg-snow group-hover:text-ink group-focus-visible:bg-snow group-focus-visible:text-ink"
                    >
                        <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                    </span>
                </div>

                <div>
                    <p className="mb-3 flex items-center gap-2 font-mono text-xs text-fog">
                        {String(index + 1).padStart(2, '0')}
                        {section.badge && (
                            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.15em] text-accent">
                                {section.badge}
                            </span>
                        )}
                    </p>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-snow sm:text-[1.75rem]">{section.title}</h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-fog">{section.description}</p>
                </div>
            </StudioLink>
        </motion.li>
    );
}

export default function MainMenu() {
    const rise = useRise(28);
    const listRef = useRef(null);

    // Arrow keys move focus between cards, in addition to Tab.
    const onKeyDown = (event) => {
        const step = arrowKeys[event.key];
        if (!step) return;

        const links = [...listRef.current.querySelectorAll('a')];
        const current = links.indexOf(document.activeElement);
        if (current === -1) return;

        event.preventDefault();
        links[(current + step + links.length) % links.length].focus();
    };

    return (
        <section
            aria-labelledby="menu-title"
            className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col justify-center px-4 pb-16 pt-4 sm:px-6 lg:px-8"
        >
            <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="mb-10 max-w-3xl sm:mb-14">
                <motion.p variants={fadeUp(rise)} className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-fog">
                    <span className="h-px w-8 bg-white/25" />
                    Main menu
                </motion.p>
                <motion.h1
                    id="menu-title"
                    variants={stagger(0)}
                    aria-label="Where would you like to go next?"
                    className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-snow"
                >
                    <SplitHeading lead="Where would you like" accent="to go next?" />
                </motion.h1>
                <motion.p variants={fadeUp(rise)} className="mt-5 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
                    Get to know me, browse my projects, or start a conversation.
                </motion.p>
            </motion.div>

            <motion.ul
                ref={listRef}
                onKeyDown={onKeyDown}
                variants={stagger(0.09, 0.25)}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
            >
                {menuSections.map((section, index) => (
                    <MenuCard key={section.key} section={section} index={index} rise={rise} />
                ))}
            </motion.ul>
        </section>
    );
}
