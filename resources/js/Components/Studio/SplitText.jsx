import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { easeOutExpo } from '@/lib/motion';

/** Container variants that stagger the letters of one SplitText line. */
export const splitLine = (delayChildren, staggerChildren = 0.03) => ({
    hidden: {},
    show: { transition: { delayChildren, staggerChildren } },
});

const letter = {
    hidden: { opacity: 0, y: '0.5em' },
    show: { opacity: 1, y: '0em', transition: { duration: 0.9, ease: easeOutExpo } },
};

const hoverLift = { y: '-0.08em', transition: { type: 'spring', stiffness: 400, damping: 15 } };

/** Returns a per-letter color function that blends `from` → `to` (RGB triples) across the text. */
export const blendColors = (from, to, holdStart = 0) => (i, total) => {
    const t = Math.min(1, Math.max(0, (i - holdStart) / Math.max(1, total - 1 - holdStart)));

    return `rgb(${from.map((c, k) => Math.round(c + (to[k] - c) * t)).join(' ')})`;
};

/**
 * Text revealed letter by letter, each letter springing up on hover. Words
 * never break mid-word. It's hidden from assistive tech, so give the parent
 * heading an aria-label with the full text.
 */
export default function SplitText({ text, variants, className = '', colorAt, lift = true }) {
    const total = text.replace(/ /g, '').length;
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
                                    whileHover={lift ? hoverLift : undefined}
                                    className="inline-block"
                                    style={colorAt ? { color: colorAt(i, total) } : undefined}
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
