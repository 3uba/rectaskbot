import { ChangeEvent } from 'react';
import './Input.css';

type InputProps = {
    value: string;
    onChange: (value: string) => void;
};

function Input({ value, onChange }: InputProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input className="input" value={value} onChange={handleChange} />
    );
}

export default Input;
