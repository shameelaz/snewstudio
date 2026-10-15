import { Link } from '@inertiajs/react';
import { forwardRef } from 'react';

/**
 * Inertia link that keeps the scroll position during the visit. StudioLayout
 * resets scroll once the outgoing page has faded out, so the jump to the top
 * is never visible mid-transition.
 */
export default forwardRef(function StudioLink(props, ref) {
    return <Link ref={ref} preserveScroll {...props} />;
});
