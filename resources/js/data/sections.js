import { FolderKanban, Mail, MessageSquareHeart, Tag } from 'lucide-react';

/** The four destinations in the main menu, in display order. */
export const sections = [
    {
        key: 'portfolio',
        href: '/portfolio',
        title: 'My Portfolio',
        short: 'Portfolio',
        description: 'Selected projects, skills and the stack behind them.',
        icon: FolderKanban,
    },
    {
        key: 'contact',
        href: '/contact',
        title: 'Contact Me',
        short: 'Contact',
        description: 'Start a WhatsApp chat about a project, role or idea.',
        icon: Mail,
    },
    {
        key: 'pricing',
        href: '/pricing',
        title: 'Pricing',
        short: 'Pricing',
        description: 'Packages for landing pages, corporate sites and online stores.',
        icon: Tag,
    },
    {
        key: 'feedback',
        href: '/feedback',
        title: 'Feedback',
        short: 'Feedback',
        description: 'Share a comment, suggestion or general thought.',
        icon: MessageSquareHeart,
    },
];

export function nextSection(key) {
    const index = sections.findIndex((section) => section.key === key);

    return sections[(index + 1) % sections.length];
}
