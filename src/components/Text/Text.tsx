import './Text.css';

type IText = {
    text: string;
};

function Text({ text }: IText) {
    return (
        <p className='text'>
            {text}
        </p>
    );
}

export default Text;