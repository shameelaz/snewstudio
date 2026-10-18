import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lightbulb, MessageCircle, MessagesSquare } from '@/lib/icons';
import FormField, { fieldLabel } from '@/Components/Studio/FormField';
import FormSuccess from '@/Components/Studio/FormSuccess';
import PillButton from '@/Components/Studio/PillButton';
import SectionShell from '@/Components/Studio/SectionShell';
import { revealOnScroll, useRise } from '@/lib/motion';

// Keep in sync with the `type` rule in StoreFeedbackRequest.
const feedbackTypes = [
    { value: 'comment', label: 'Comment', icon: MessageCircle },
    { value: 'suggestion', label: 'Suggestion', icon: Lightbulb },
    { value: 'general', label: 'General', icon: MessagesSquare },
];

export default function FeedbackSection() {
    const rise = useRise();
    const [sent, setSent] = useState(false);
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        type: 'comment',
        message: '',
        name: '',
        email: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('feedback.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                setSent(true);
            },
        });
    };

    const field = (key) => ({
        value: data[key],
        error: errors[key],
        onChange: (event) => {
            setData(key, event.target.value);
            if (errors[key]) clearErrors(key);
        },
    });

    return (
        <SectionShell
            sectionKey="feedback"
            title="Your thoughts"
            accent="shape what's next."
            intro="Spotted something worth improving, or enjoyed something in particular? Leave a comment, suggestion or general feedback below."
        >
            <motion.div {...revealOnScroll(rise)} className="mx-auto max-w-3xl rounded-3xl border border-white/[0.08] bg-ink-raised/70 p-5 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                    {sent ? (
                        <FormSuccess
                            key="sent"
                            title="Thank you!"
                            message="Your feedback has been received."
                            actionLabel="Share more feedback"
                            onReset={() => setSent(false)}
                        />
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={submit}
                            noValidate
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            className="grid gap-5 sm:grid-cols-2"
                        >
                            <fieldset className="sm:col-span-2">
                                <legend className={fieldLabel}>Type of feedback</legend>
                                <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
                                    {feedbackTypes.map(({ value, label, icon: Icon }) => (
                                        <label
                                            key={value}
                                            className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-fog transition duration-300 hover:border-white/25 hover:text-snow has-checked:border-transparent has-checked:bg-snow has-checked:text-ink has-focus-visible:ring-2 has-focus-visible:ring-accent has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-ink"
                                        >
                                            <input
                                                type="radio"
                                                name="type"
                                                value={value}
                                                checked={data.type === value}
                                                onChange={() => setData('type', value)}
                                                className="sr-only"
                                            />
                                            <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                                {errors.type && <p className="mt-2 text-sm text-rose-300">{errors.type}</p>}
                            </fieldset>

                            <FormField
                                id="message"
                                label="Your feedback"
                                as="textarea"
                                rows={6}
                                required
                                placeholder="What's on your mind?"
                                className="sm:col-span-2"
                                {...field('message')}
                            />
                            <FormField id="name" label="Name" optional autoComplete="name" placeholder="Your name" {...field('name')} />
                            <FormField id="email" label="Email address" optional type="email" autoComplete="email" placeholder="you@example.com" {...field('email')} />

                            <div className="flex justify-end pt-2 sm:col-span-2">
                                <PillButton type="submit" disabled={processing} busy={processing}>
                                    {processing ? 'Sending' : 'Send feedback'}
                                </PillButton>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </SectionShell>
    );
}
