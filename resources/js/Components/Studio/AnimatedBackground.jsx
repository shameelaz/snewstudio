import { memo, useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/lib/motion';

// Seeded rather than Math.random() so particles keep their places across visits.
const seeded = (i, n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;

const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${seeded(i, 1) * 100}%`,
    size: 1 + seeded(i, 2) * 2,
    duration: 18 + seeded(i, 3) * 16,
    delay: -seeded(i, 4) * 34,
    drift: (seeded(i, 5) - 0.5) * 120,
    opacity: 0.15 + seeded(i, 6) * 0.35,
    desktopOnly: i % 2 === 1,
}));

/**
 * Fixed ambient backdrop: drifting light blooms, a masked grid, slow particles
 * and (on mouse devices) a soft glow that trails the cursor. Everything
 * animates transform/opacity only; `calm` dims it behind content-heavy pages.
 */
function AnimatedBackground({ calm = false }) {
    const reduceMotion = useReducedMotion();
    const finePointer = useMediaQuery('(pointer: fine)');
    const trackPointer = finePointer && !reduceMotion;

    const pointerX = useMotionValue(-1000);
    const pointerY = useMotionValue(-1000);
    const glowX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.8 });
    const glowY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.8 });

    useEffect(() => {
        if (!trackPointer) return;

        const onMove = (event) => {
            pointerX.set(event.clientX);
            pointerY.set(event.clientY);
        };

        window.addEventListener('pointermove', onMove, { passive: true });

        return () => window.removeEventListener('pointermove', onMove);
    }, [trackPointer, pointerX, pointerY]);

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
            <div className={`absolute inset-0 transition-opacity duration-1000 ${calm ? 'opacity-55' : 'opacity-100'}`}>
                <div
                    className="studio-blob -left-[25%] -top-[30%] size-[75vmax] [animation:studio-drift-a_26s_ease-in-out_infinite]"
                    style={{ background: 'radial-gradient(closest-side, rgb(165 148 255 / 0.2), transparent)' }}
                />
                <div
                    className="studio-blob -bottom-[35%] -right-[30%] size-[80vmax] [animation:studio-drift-b_32s_ease-in-out_infinite]"
                    style={{ background: 'radial-gradient(closest-side, rgb(110 231 216 / 0.12), transparent)' }}
                />

                {particles.map((particle, i) => (
                    <span
                        key={i}
                        className={`studio-particle ${particle.desktopOnly ? 'hidden sm:block' : ''}`}
                        style={{
                            left: particle.left,
                            width: particle.size,
                            height: particle.size,
                            '--t': `${particle.duration}s`,
                            '--d': `${particle.delay}s`,
                            '--dx': `${particle.drift}px`,
                            '--o': particle.opacity,
                        }}
                    />
                ))}
            </div>

            <div className="studio-grid absolute inset-0" />

            {trackPointer && (
                <motion.div
                    className="absolute left-0 top-0 size-[36rem] rounded-full"
                    style={{
                        x: glowX,
                        y: glowY,
                        translateX: '-50%',
                        translateY: '-50%',
                        background: 'radial-gradient(closest-side, rgb(165 148 255 / 0.07), transparent)',
                    }}
                />
            )}

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--color-ink)_100%)]" />
        </div>
    );
}

export default memo(AnimatedBackground);
