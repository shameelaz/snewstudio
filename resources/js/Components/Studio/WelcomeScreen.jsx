import { Fragment } from 'react';
import { motion } from 'framer-motion';
import PillButton from '@/Components/Studio/PillButton';
import { easeIn, easeOutExpo, useRise } from '@/lib/motion';

const root = {
    hidden: {},
    show: {},
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: easeIn } },
};

const line = (delayChildren, staggerChildren) => ({
    hidden: {},
    show: { transition: { delayChildren, staggerChildren } },
});

const letter = {
    hidden: { opacity: 0, y: '0.5em' },
    show: { opacity: 1, y: '0em', transition: { duration: 0.9, ease: easeOutExpo } },
};

const appear = (delay, rise) => ({
    hidden: { opacity: 0, y: rise },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: easeOutExpo } },
});

const rule = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { scaleX: 1, opacity: 1, transition: { duration: 1.1, delay: 0.3, ease: easeOutExpo } },
};

// Letters fade from near-white into the accent across the word.
const from = [244, 244, 246];
const to = [183, 170, 255];
const tint = (i, total) => {
    const t = Math.max(0, (i - 2) / (total - 3));

    return `rgb(${from.map((c, k) => Math.round(c + (to[k] - c) * t)).join(' ')})`;
};

function SplitText({ text, variants, className, colored = false, hoverLift = false }) {
    const letters = text.replace(/ /g, '').length;
    let index = 0;

    return (
        <motion.span aria-hidden="true" variants={variants} className={className}>
            {text.split(' ').map((word, w) => (
                <Fragment key={w}>
                    {w > 0 && ' '}
                    <span className="inline-block whitespace-nowrap">
                        {[...word].map((char) => {
                            const i = index++;

                            return (
                                <motion.span
                                    key={i}
                                    variants={letter}
                                    whileHover={hoverLift ? { y: '-0.08em', transition: { type: 'spring', stiffness: 400, damping: 15 } } : undefined}
                                    className="inline-block"
                                    style={colored ? { color: tint(i, letters) } : undefined}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </span>
                </Fragment>
            ))}
        </motion.span>
    );
}

export default function WelcomeScreen() {
    const rise = useRise(20);
    const year = new Date().getFullYear();

    return (
        <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6">
            <motion.div variants={root} initial="hidden" animate="show" exit="exit" className="relative flex w-full max-w-6xl flex-col items-center">
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[60%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ background: 'radial-gradient(closest-side, rgb(165 148 255 / 0.18), transparent)' }}
                    variants={{
                        hidden: { opacity: 0, scale: 0.7 },
                        show: { opacity: 1, scale: 1, transition: { duration: 1.8, delay: 0.3, ease: easeOutExpo } },
                    }}
                />

                <h1 aria-label="Welcome to SNEWSTUDIO" className="font-display text-snow">
                    <span className="flex items-center justify-center gap-4 sm:gap-6">
                        <motion.span variants={rule} style={{ originX: 1 }} className="h-px w-8 bg-linear-to-l from-white/40 to-transparent sm:w-16" />
                        <SplitText
                            text="WELCOME TO"
                            variants={line(0.15, 0.03)}
                            className="-mr-[0.45em] block text-[clamp(0.8rem,2.2vw,1.4rem)] font-medium tracking-[0.45em] text-fog"
                        />
                        <motion.span variants={rule} style={{ originX: 0 }} className="h-px w-8 bg-linear-to-r from-white/40 to-transparent sm:w-16" />
                    </span>
                    <SplitText
                        text="SNEWSTUDIO"
                        variants={line(0.4, 0.045)}
                        colored
                        hoverLift
                        className="mt-3 block text-[clamp(2.6rem,12.5vw,10.5rem)] font-bold leading-[0.95] tracking-[-0.045em] sm:mt-5"
                    />
                </h1>

                <motion.p
                    variants={appear(1.15, rise)}
                    className="mt-6 text-[clamp(1rem,2.2vw,1.35rem)] font-light tracking-wide text-fog sm:mt-8"
                >
                    Creative. Modern. <br className="sm:hidden" />
                    <span className="text-snow">Let's build your website together.</span>
                </motion.p>

                <motion.div variants={appear(1.4, rise)} className="mt-10 sm:mt-14">
                    <PillButton href="/menu" size="lg" prefetch="mount">
                        Look more
                    </PillButton>
                </motion.div>
            </motion.div>

            <motion.div
                variants={appear(1.8, 0)}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6 text-[0.7rem] uppercase tracking-[0.2em] text-fog/70 sm:justify-between sm:px-8"
            >
                <span>© {year} snewstudio.dev</span>
                <span className="hidden sm:block">Shameel Azhar · Full Stack Developer</span>
            </motion.div>
        </section>
    );
}
