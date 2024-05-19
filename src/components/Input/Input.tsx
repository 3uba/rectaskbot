import { ChangeEvent } from 'react';
import './Input.css';

type InputProps = {
    value: string | number;
    placeholder?: string;
    onChange: (value: string) => void;
};

function Input({ value, placeholder, onChange }: InputProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input className="input" value={value} onChange={handleChange} placeholder={placeholder}/>
    );
}

export default Input;
