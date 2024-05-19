import { useState } from 'react';
import "./TodoList.css"

import Input from '../Input/Input';
import Button from '../Button/Button';
import Text from '../Text/Text'

function TodoList() {
    const [todos, setTodos] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;
        setTodos([...todos, inputValue]);
        setInputValue('');
    };

    const handleDeleteTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div>
            <h2>Todo List</h2>
            <Input value={inputValue} onChange={handleInputChange} />
            <Button text="Add Todo" onClick={handleAddTodo} />
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} className='inline'>
                        <Button text="Delete" onClick={() => handleDeleteTodo(index)} type='error' size='small'/>
                        <Text text={todo}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
