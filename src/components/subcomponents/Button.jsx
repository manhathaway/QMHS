import css from './Button.module.css';

const IconButton = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`${css.button} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;