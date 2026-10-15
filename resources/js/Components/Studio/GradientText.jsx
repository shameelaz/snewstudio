export default function GradientText({ className = '', children }) {
    return (
        <span className={`bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent ${className}`}>
            {children}
        </span>
    );
}
