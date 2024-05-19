import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TransactionBox from '../../components/TransactionBox/TransactionBox';

function Home() {
    return (
        <>
            <Link to='/chart'>
                <Button text='Chart' />
            </Link>
            <TransactionBox />
        </>
    );
}

export default Home;
