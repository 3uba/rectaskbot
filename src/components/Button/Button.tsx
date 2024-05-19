import './Button.css';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonType = 'default' | 'error';

export type IButton = {
    text: string;
    size?: ButtonSize;
    type?: ButtonType;
    onClick?: () => void;
};

function Button({ text, size, type, onClick}: IButton) {
    const buttonClassName = `button ${size} ${type}`

    return (
        <button className={buttonClassName} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;