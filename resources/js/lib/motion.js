import { useEffect, useState } from 'react';

export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeIn = [0.4, 0, 1, 1];

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setMatches(media.matches);

        onChange();
        media.addEventListener('change', onChange);

        return () => media.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}

/**
 * Entrance travel distance in px, shortened on small screens so motion
 * feels proportional to the viewport.
 */
export function useRise(base = 24) {
    const compact = useMediaQuery('(max-width: 639px)');

    return compact ? Math.round(base * 0.6) : base;
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
});

export const fadeUp = (rise = 24, duration = 0.8, delay = 0) => ({
    hidden: { opacity: 0, y: rise },
    // Only set `delay` when asked: an explicit 0 would override a parent's stagger offset.
    show: { opacity: 1, y: 0, transition: { duration, ease: easeOutExpo, ...(delay > 0 && { delay }) } },
});

/** Props for content that reveals once as it scrolls into view. */
export const revealOnScroll = (rise = 24, delay = 0) => ({
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, amount: 0.2 },
    variants: fadeUp(rise, 0.8, delay),
});
