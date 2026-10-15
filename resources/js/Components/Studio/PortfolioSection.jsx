import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, GraduationCap } from 'lucide-react';
import GradientText from '@/Components/Studio/GradientText';
import SectionShell from '@/Components/Studio/SectionShell';
import { career, certifications, education, profile, projects, toolbelt } from '@/data/portfolio';
import { revealOnScroll, useRise } from '@/lib/motion';

const chapters = [
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'stack', label: 'Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'credentials', label: 'Credentials' },
];

const card = 'rounded-3xl border border-white/[0.08] bg-ink-raised/70 transition-colors duration-500 hover:border-white/15';

function ChapterHeading({ id, index, title, aside }) {
    const rise = useRise();

    return (
        <motion.div {...revealOnScroll(rise)} className="mb-8 flex items-end justify-between gap-4 border-b border-white/[0.08] pb-5 sm:mb-10">
            <h2 id={`${id}-title`} className="flex items-baseline gap-4 font-display text-2xl font-semibold tracking-tight text-snow sm:text-4xl">
                <span className="font-mono text-xs font-normal text-accent">{String(index).padStart(2, '0')}</span>
                {title}
            </h2>
            {aside && <span className="font-mono text-xs uppercase tracking-[0.2em] text-fog">{aside}</span>}
        </motion.div>
    );
}

function Chapter({ id, index, title, aside, children }) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 pt-16 first:pt-0 sm:pt-24">
            <ChapterHeading id={id} index={index} title={title} aside={aside} />
            {children}
        </section>
    );
}

function Tag({ children }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-fog">{children}</span>
    );
}

function ProjectCard({ project, featured, wide, delay }) {
    const rise = useRise(32);

    return (
        <motion.article
            {...revealOnScroll(rise, delay)}
            className={`group flex flex-col p-6 sm:p-8 ${card} ${featured || wide ? 'md:col-span-2' : ''}`}
        >
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fog">
                <span>{project.date}</span>
                <span className="normal-case tracking-normal">{project.company}</span>
            </div>
            <h3
                className={`mt-5 font-display font-semibold tracking-tight text-snow transition-colors duration-500 group-hover:text-accent ${featured ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}
            >
                {project.title}
            </h3>
            <p className={`mt-4 leading-relaxed text-fog ${featured ? 'max-w-3xl sm:text-lg' : ''}`}>{project.description}</p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                        <Tag key={item}>{item}</Tag>
                    ))}
                </div>
                {project.links?.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        {project.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group/link inline-flex items-center gap-1 rounded text-sm font-medium text-snow hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                {link.label}
                                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </motion.article>
    );
}

function CredentialList({ title, icon: Icon, items }) {
    const rise = useRise();

    return (
        <motion.div {...revealOnScroll(rise)} className={`p-6 sm:p-8 ${card}`}>
            <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
                <Icon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
                {title}
            </h3>
            <ul className="mt-6 divide-y divide-white/[0.06]">
                {items.map((item) => (
                    <li key={item.title} className="py-5 first:pt-0 last:pb-0">
                        <p className="font-mono text-xs text-fog">{item.date}</p>
                        <p className="mt-2 font-display text-lg font-semibold text-snow">{item.title}</p>
                        <p className="text-sm text-fog">{item.issuer}</p>
                        <p className="mt-3 text-sm leading-relaxed text-fog/80">{item.description}</p>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function PortfolioSection() {
    const rise = useRise();
    const reduceMotion = useReducedMotion();

    // Honour deep links such as /portfolio#work once the page has transitioned in.
    useEffect(() => {
        const id = window.location.hash.slice(1);
        if (!id) return;

        const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 450);

        return () => clearTimeout(timer);
    }, [reduceMotion]);

    const jumpTo = (event, id) => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        window.history.replaceState(window.history.state, '', `#${id}`);
    };

    return (
        <SectionShell
            sectionKey="portfolio"
            title={
                <>
                    Hi, I'm {profile.name}. <GradientText>{profile.role}.</GradientText>
                </>
            }
            intro={profile.intro}
        >
            <motion.nav aria-label="Portfolio chapters" {...revealOnScroll(rise)} className="-mt-4 mb-16 flex flex-wrap gap-2 sm:mb-20">
                {chapters.map((chapter) => (
                    <a
                        key={chapter.id}
                        href={`#${chapter.id}`}
                        onClick={(event) => jumpTo(event, chapter.id)}
                        className="inline-flex min-h-10 items-center rounded-full border border-white/10 px-4 text-sm font-medium text-fog transition-colors hover:border-white/25 hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                        {chapter.label}
                    </a>
                ))}
            </motion.nav>

            <Chapter id="about" index={1} title="About">
                <motion.div {...revealOnScroll(rise)} className="grid gap-6 text-base leading-relaxed text-fog sm:text-lg md:grid-cols-2 md:gap-10">
                    {profile.about.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                </motion.div>
            </Chapter>

            <Chapter id="work" index={2} title="Selected work" aside={`${String(projects.length).padStart(2, '0')} projects`}>
                <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            featured={i === 0}
                            wide={i === projects.length - 1 && i % 2 === 1}
                            delay={i === 0 ? 0 : ((i - 1) % 2) * 0.1}
                        />
                    ))}
                </div>
            </Chapter>

            <Chapter id="stack" index={3} title="Toolbelt">
                <div className="grid gap-4 md:grid-cols-3">
                    {toolbelt.map((group, i) => (
                        <motion.div
                            key={group.title}
                            {...revealOnScroll(rise, i * 0.08)}
                            className={`p-6 sm:p-7 ${card}`}
                        >
                            <h3 className="font-display text-lg font-semibold text-snow">{group.title}</h3>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <li
                                        key={item}
                                        className="cursor-default rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-fog transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-snow"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </Chapter>

            <Chapter id="experience" index={4} title="Experience">
                <ol className="relative space-y-4">
                    {career.map((job) => (
                        <motion.li key={job.date} {...revealOnScroll(rise)} className={`grid gap-3 p-6 sm:p-8 md:grid-cols-[13rem_1fr] md:gap-10 ${card}`}>
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-fog md:pt-1.5">{job.date}</p>
                            <div>
                                <h3 className="font-display text-xl font-semibold tracking-tight text-snow sm:text-2xl">{job.role}</h3>
                                <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>
                                <p className="mt-4 leading-relaxed text-fog">{job.description}</p>
                            </div>
                        </motion.li>
                    ))}
                </ol>
            </Chapter>

            <Chapter id="credentials" index={5} title="Credentials">
                <div className="grid gap-4 md:grid-cols-2">
                    <CredentialList title="Certifications" icon={BadgeCheck} items={certifications} />
                    <CredentialList title="Education" icon={GraduationCap} items={education} />
                </div>
            </Chapter>
        </SectionShell>
    );
}
