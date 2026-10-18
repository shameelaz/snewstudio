/**
 * Service packages shown on the Pricing page. If this list is emptied the
 * page falls back to a "Coming soon" state.
 *
 * `prefix` sits above the price (e.g. "From"), `badge` highlights a plan,
 * and `cta` labels its button, which opens the contact form with the
 * package name prefilled as the subject.
 */
export const pricingIntro = 'Choose the package that fits your business needs. All packages include domain, hosting, and full technical maintenance for 1 year.';

export const plans = [
    {
        name: 'Landing Page',
        price: 'RM1500 – RM2000',
        features: [
            '1-page premium landing design',
            'Optional payment gateway / OnPay (+RM200)',
            '1 year domain & hosting',
            '1 year technical maintenance',
            'Professional copywriting',
            'Mobile & speed optimized',
            'WhatsApp integration',
        ],
        cta: 'Contact to start',
    },
    {
        name: 'Corporate Website',
        prefix: 'From',
        price: 'RM3800',
        features: [
            'Up to 10 structured pages',
            'Profile, services, forms',
            '1 year domain & hosting',
            '1 year technical maintenance',
            'Full design & copywriting',
            'SEO-ready structure',
            'Branding-consistent visuals',
        ],
        cta: 'Get quotation',
        featured: true,
        badge: 'Most popular',
    },
    {
        name: 'E-Commerce',
        prefix: 'From',
        price: 'RM4200',
        features: [
            'WooCommerce / Shopify',
            'Full store setup & checkout',
            'Payment gateway integration',
            'Product & category setup',
            'Speed & security optimized',
            '1 year maintenance included',
            'Basic ads tracking setup',
        ],
        cta: 'Discuss your store',
    },
];
