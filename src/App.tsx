import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './views/Home/Home';
import Chart from './views/Chart/Chart';
import Header from './components/Header/Header';
import { AuthContext } from './store/AuthContext';
import { useTonAuth } from './hooks/useTonAuth';

import './App.css';

function App() {
	const {token, setToken} = useTonAuth();

    return (
		<AuthContext.Provider value={{ token, setToken }}>
			<div className='app'>
				<Header />
				<Router>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/chart' element={<Chart />} />
					</Routes>
				</Router>
			</div>
		</AuthContext.Provider> 
    );
}

export default App;
