import { FolderKanban, Mail, MessageSquareHeart, Tag, UserRound } from '@/lib/icons';

/**
 * Every section page, in display order. Entries marked `hidden` keep a
 * working page but stay out of the main menu and header navigation.
 */
export const sections = [
    {
        key: 'portfolio',
        href: '/portfolio',
        title: 'My Portfolio',
        short: 'Portfolio',
        description: 'About me, my toolbelt, experience and credentials.',
        icon: UserRound,
    },
    {
        key: 'projects',
        href: '/projects',
        title: 'Projects',
        short: 'Projects',
        description: 'Systems and applications I have delivered.',
        icon: FolderKanban,
    },
    {
        key: 'pricing',
        href: '/pricing',
        title: 'Pricing',
        short: 'Pricing',
        description: 'Landing page, corporate and e-commerce packages.',
        icon: Tag,
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
        key: 'feedback',
        href: '/feedback',
        title: 'Feedback',
        short: 'Feedback',
        description: 'Share a comment, suggestion or general thought.',
        icon: MessageSquareHeart,
        hidden: true,
    },
];

/** The destinations shown in the main menu and header navigation. */
export const menuSections = sections.filter((section) => !section.hidden);

export function nextSection(key) {
    const index = menuSections.findIndex((section) => section.key === key);

    return menuSections[(index + 1) % menuSections.length];
}
