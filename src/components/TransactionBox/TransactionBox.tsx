import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import { useState } from 'react';

import "./TransactionBox.css";
import { useTonConnectUI } from '@tonconnect/ui-react';

function TransactionBox() {
    const [tonConnectUI] = useTonConnectUI();
    const [value, setValue] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleValueChange = (value: string) => {
        setValue(value);
    };

    const handleAddressChange = (value: string) => {
        setAddress(value);
    }

    const handleTransactionClick = () => {
        setError("")

        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue) || parsedValue <= 0) {
            setError('Value must be a positive number');
            return;
        }
        if (typeof address !== 'string' || address.trim() === '') {
            setError('Address must be a non-empty string');
            return;
        } 

        tonConnectUI.sendTransaction(
            {
                messages: [
                    {
                        address: address, 
                        amount: (parsedValue * 1000000000).toString()
                    }
                ],
                validUntil: Math.floor(new Date().valueOf() / 1000) + 360,
            }
        )
    }

    return (
        <div className='box'>
            <Text text='Transaction' />
            { error && <Text text={error} />}
            <Input value={value} onChange={handleValueChange} placeholder='Input value in ton'/>
            <Input value={address} onChange={handleAddressChange} placeholder='Input ton wallet address' />
            <Button text='Transfer' onClick={handleTransactionClick} />
        </div>
    );
}

export default TransactionBox;
