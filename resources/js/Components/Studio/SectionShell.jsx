import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@/lib/icons';
import { SplitHeading } from '@/Components/Studio/SplitText';
import StudioLink from '@/Components/Studio/StudioLink';
import { nextSection, sections } from '@/data/sections';
import { fadeUp, revealOnScroll, stagger, useRise } from '@/lib/motion';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink';

/** Shared frame for section pages: numbered intro, content, and onward navigation. */
export default function SectionShell({ sectionKey, title, accent, intro, children }) {
    const rise = useRise();
    const index = sections.findIndex((section) => section.key === sectionKey);
    const section = sections[index];
    const next = nextSection(sectionKey);

    return (
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:px-8">
            <motion.header variants={stagger(0.08)} initial="hidden" animate="show" className="max-w-3xl">
                <motion.p variants={fadeUp(rise)} className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-fog">
                    <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
                    <span className="h-px w-8 bg-white/25" />
                    {section.title}
                </motion.p>
                <motion.h1
                    variants={stagger(0)}
                    aria-label={accent ? `${title} ${accent}` : title}
                    className="font-display text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-snow"
                >
                    <SplitHeading lead={title} accent={accent} />
                </motion.h1>
                {intro && (
                    <motion.p variants={fadeUp(rise)} className="mt-6 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">
                        {intro}
                    </motion.p>
                )}
            </motion.header>

            <div className="mt-12 sm:mt-16">{children}</div>

            <motion.nav
                aria-label="Continue"
                {...revealOnScroll(rise)}
                className="mt-24 flex flex-col-reverse gap-6 border-t border-white/[0.08] pt-8 sm:mt-32 sm:flex-row sm:items-end sm:justify-between"
            >
                <StudioLink
                    href="/menu"
                    className={`group inline-flex min-h-11 items-center gap-2 self-start rounded-full text-sm font-medium text-fog transition-colors hover:text-snow ${focusRing}`}
                >
                    <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
                    Back to main menu
                </StudioLink>

                <StudioLink href={next.href} className={`group rounded-2xl text-left sm:text-right ${focusRing}`}>
                    <span className="block font-mono text-xs uppercase tracking-[0.25em] text-fog">Next</span>
                    <span className="mt-2 flex items-center gap-3 font-display text-3xl font-semibold tracking-tight text-snow sm:justify-end sm:text-4xl">
                        {next.title}
                        <ArrowRight aria-hidden="true" className="size-6 text-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-2" />
                    </span>
                </StudioLink>
            </motion.nav>
        </div>
    );
}
