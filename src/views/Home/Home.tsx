import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

function Home() {
    return (
        <>
            <Link to='/chart'>
                <Button text='Go to chart' />
            </Link>
        </>
    );
}

export default Home;
