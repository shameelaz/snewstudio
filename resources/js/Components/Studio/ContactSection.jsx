import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Lightbulb, Link2, MessageCircle } from '@/lib/icons';
import FormField from '@/Components/Studio/FormField';
import FormSuccess from '@/Components/Studio/FormSuccess';
import PillButton from '@/Components/Studio/PillButton';
import SectionShell from '@/Components/Studio/SectionShell';
import { revealOnScroll, useRise } from '@/lib/motion';

const tips = [
    { icon: Lightbulb, title: 'What you are building', text: 'A sentence or two on the idea, product or role.' },
    { icon: Calendar, title: 'Timeline', text: 'When you would like to start and any key dates.' },
    { icon: Link2, title: 'References', text: 'Links to existing sites, designs or documents help.' },
];

const whatsappUrl = (number, text) => `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

const composeMessage = ({ name, subject, message }) =>
    [`Hi, I'm ${name.trim()}.`, subject.trim() && `*${subject.trim()}*`, message.trim()].filter(Boolean).join('\n\n');

function validate(data) {
    const errors = {};

    if (!data.name.trim()) errors.name = 'Please tell me your name.';
    if (!data.message.trim()) errors.message = 'Please write a short message.';

    return errors;
}

// Opens in a new tab on desktop (WhatsApp Web) and hands off to the app on phones.
// `noopener` is applied by hand: passing it to window.open makes the call return
// null, which would look like a blocked popup and trigger the fallback too.
function openWhatsApp(url) {
    const opened = window.open(url, '_blank');

    if (opened) opened.opener = null;
    else window.location.href = url;
}

function DirectChat({ number }) {
    return (
        <div className="mt-10 rounded-3xl border border-white/[0.08] bg-ink-raised/70 p-6">
            <p className="font-medium text-snow">Prefer to just say hi?</p>
            <p className="mt-1 text-sm leading-relaxed text-fog">Skip the form and start a WhatsApp chat directly.</p>
            <a
                href={whatsappUrl(number)}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 text-sm font-medium text-[#5ee08f] transition-colors duration-300 hover:bg-[#25D366] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
                <MessageCircle aria-hidden="true" className="size-4" strokeWidth={2} />
                Chat on WhatsApp
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
        </div>
    );
}

export default function ContactSection() {
    const rise = useRise();
    const { whatsapp } = usePage().props;
    const [sentUrl, setSentUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState(() => ({
        name: '',
        subject: new URLSearchParams(window.location.search).get('subject') ?? '',
        message: '',
    }));

    const submit = (event) => {
        event.preventDefault();

        const found = validate(data);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            document.getElementById(Object.keys(found)[0])?.focus();
            return;
        }

        const url = whatsappUrl(whatsapp, composeMessage(data));
        openWhatsApp(url);
        setSentUrl(url);
    };

    const field = (key) => ({
        value: data[key],
        error: errors[key],
        onChange: (event) => {
            setData((current) => ({ ...current, [key]: event.target.value }));
            if (errors[key]) setErrors(({ [key]: _, ...rest }) => rest);
        },
    });

    return (
        <SectionShell
            sectionKey="contact"
            title="Let's build something"
            accent="with purpose."
            intro="Whether it's a project, a role or just an idea worth exploring, send a message on WhatsApp and let's talk it through."
        >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                <motion.aside {...revealOnScroll(rise)} aria-labelledby="contact-tips">
                    <h2 id="contact-tips" className="font-mono text-xs uppercase tracking-[0.2em] text-fog">
                        A good first message includes
                    </h2>
                    <ul className="mt-6 space-y-6">
                        {tips.map(({ icon: Icon, title, text }) => (
                            <li key={title} className="flex gap-4">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent">
                                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                                </span>
                                <div>
                                    <p className="font-medium text-snow">{title}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-fog">{text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {whatsapp && <DirectChat number={whatsapp} />}
                </motion.aside>

                <motion.div {...revealOnScroll(rise, 0.1)} className="rounded-3xl border border-white/[0.08] bg-ink-raised/70 p-5 sm:p-8">
                    {!whatsapp ? (
                        <p className="py-16 text-center text-fog">Messaging is not available right now. Please check back soon.</p>
                    ) : (
                        <AnimatePresence mode="wait" initial={false}>
                            {sentUrl ? (
                                <FormSuccess
                                    key="sent"
                                    title="Continue in WhatsApp"
                                    message="Your message is ready in WhatsApp. Just press send there to reach me."
                                    actionLabel="Write another message"
                                    onReset={() => {
                                        setSentUrl(null);
                                        setData((current) => ({ ...current, subject: '', message: '' }));
                                    }}
                                >
                                    <a
                                        href={sentUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4 inline-flex items-center gap-1 rounded text-sm font-medium text-accent hover:text-snow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    >
                                        WhatsApp didn't open? Open it here
                                        <ArrowUpRight aria-hidden="true" className="size-4" />
                                    </a>
                                </FormSuccess>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={submit}
                                    noValidate
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                    className="grid gap-5"
                                >
                                    <FormField id="name" label="Name" autoComplete="name" required placeholder="Your name" {...field('name')} />
                                    <FormField id="subject" label="Subject" optional placeholder="What's this about?" {...field('subject')} />
                                    <FormField id="message" label="Message" as="textarea" rows={6} required placeholder="Tell me a little about it..." {...field('message')} />
                                    <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="max-w-xs text-xs leading-relaxed text-fog/70">Opens WhatsApp with your message ready to send.</p>
                                        <PillButton type="submit">Send via WhatsApp</PillButton>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    )}
                </motion.div>
            </div>
        </SectionShell>
    );
}
