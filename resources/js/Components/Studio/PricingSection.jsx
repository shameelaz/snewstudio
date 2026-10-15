import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import GradientText from '@/Components/Studio/GradientText';
import PillButton from '@/Components/Studio/PillButton';
import SectionShell from '@/Components/Studio/SectionShell';
import StudioLink from '@/Components/Studio/StudioLink';
import { plans, pricingIntro } from '@/data/pricing';
import { revealOnScroll, useRise } from '@/lib/motion';

const card = 'relative rounded-3xl border border-white/[0.08] bg-ink-raised/70 p-6 sm:p-8';

function ComingSoon() {
    const rise = useRise();

    return (
        <motion.div {...revealOnScroll(rise)} className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-ink-raised/60 px-5 py-14 sm:px-10 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

            <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                        <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                    Coming soon
                </span>
                <p className="mt-6 max-w-lg text-fog">
                    In the meantime, get in touch and we can talk through what your project needs.
                </p>
                <PillButton href="/contact" className="mt-8">
                    Discuss a project
                </PillButton>
            </div>

            <div aria-hidden="true" className="mt-14 grid gap-4 opacity-60 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-3xl border border-dashed border-white/10 p-6">
                        {['w-1/3', 'w-2/3', 'w-1/2', 'w-3/4', 'w-2/5'].map((width, row) => (
                            <div
                                key={row}
                                className={`studio-shimmer relative overflow-hidden rounded-full bg-white/[0.06] ${width} ${row === 1 ? 'mt-5 h-6' : 'h-2.5'} ${row > 1 ? 'mt-3' : ''}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function PlanCard({ plan, delay }) {
    const rise = useRise();
    const subject = encodeURIComponent(`${plan.name} package`);

    return (
        <motion.article
            {...revealOnScroll(rise, delay)}
            className={`flex flex-col ${card} ${plan.featured ? 'bg-ink-raised lg:-my-4 lg:py-12' : ''} md:max-lg:last:odd:col-span-2 md:max-lg:last:odd:w-[calc(50%-0.75rem)] md:max-lg:last:odd:justify-self-center`}
        >
            {plan.featured && <span aria-hidden="true" className="studio-gradient-border pointer-events-none absolute inset-0 rounded-[inherit]" />}
            {plan.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-linear-to-r from-accent to-accent-2 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink sm:left-8">
                    {plan.badge}
                </span>
            )}

            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fog">{plan.name}</h2>
            <p className="mt-5 min-h-6 text-sm text-fog">{plan.prefix}</p>
            <p className="whitespace-nowrap font-display text-[clamp(1.6rem,2.2vw,2rem)] font-semibold leading-tight tracking-tight text-snow">{plan.price}</p>
            {plan.description && <p className="mt-3 text-sm text-fog">{plan.description}</p>}

            <ul className="mb-10 mt-8 space-y-3.5 border-t border-white/[0.08] pt-8">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-relaxed text-fog">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                        {feature}
                    </li>
                ))}
            </ul>

            <StudioLink
                href={`/contact?subject=${subject}`}
                className={`group mt-auto flex min-h-12 items-center justify-between gap-3 rounded-full px-5 text-xs font-semibold uppercase tracking-[0.15em] transition duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${plan.featured ? 'bg-linear-to-r from-accent to-accent-2 text-ink hover:brightness-110' : 'border border-white/15 text-snow hover:border-transparent hover:bg-snow hover:text-ink'}`}
            >
                <span className="whitespace-nowrap">{plan.cta ?? 'Get started'}</span>
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
            </StudioLink>
        </motion.article>
    );
}

export default function PricingSection() {
    const hasPlans = plans.length > 0;

    return (
        <SectionShell
            sectionKey="pricing"
            title={
                hasPlans ? (
                    <>
                        Pick the package <GradientText>that fits.</GradientText>
                    </>
                ) : (
                    <>
                        Packages are <GradientText>in the works.</GradientText>
                    </>
                )
            }
            intro={hasPlans ? pricingIntro : 'Service packages and pricing are being finalised and will be published here soon.'}
        >
            {hasPlans ? (
                <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:pt-4">
                    {plans.map((plan, i) => (
                        <PlanCard key={plan.name} plan={plan} delay={i * 0.08} />
                    ))}
                </div>
            ) : (
                <ComingSoon />
            )}
        </SectionShell>
    );
}
