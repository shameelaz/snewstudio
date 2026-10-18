import { motion } from 'framer-motion';
import { ArrowUpRight } from '@/lib/icons';
import SectionShell from '@/Components/Studio/SectionShell';
import { projects } from '@/data/portfolio';
import { revealOnScroll, useRise } from '@/lib/motion';

const card = 'rounded-3xl border border-white/[0.08] bg-ink-raised/70 transition-colors duration-500 hover:border-white/15';

function Tag({ children }) {
    return <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-fog">{children}</span>;
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
            <h2
                className={`mt-5 font-display font-semibold tracking-tight text-snow transition-colors duration-500 group-hover:text-accent ${featured ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}
            >
                {project.title}
            </h2>
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

export default function ProjectsSection() {
    return (
        <SectionShell
            sectionKey="projects"
            title="Work I've built"
            accent="and delivered."
            intro={`A selection of ${projects.length} projects delivered over the years, from government portals to payment and GIS platforms.`}
        >
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
        </SectionShell>
    );
}
