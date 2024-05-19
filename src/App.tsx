import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Chart from './views/Chart/Chart';
import './App.css';

function App() {
    return (
        <Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/chart' element={<Chart />} />
			</Routes>
		</Router>
    );
}

export default App;
