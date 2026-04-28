import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
 {/* <Home/> */}
 <BrowserRouter>
<Routes>
  <Route exct path='/' element={<Home/>}></Route>
    <Route exct path='/UserPage' element={<UserPage/>}></Route>
</Routes>
 </BrowserRouter>
    </div>
  );
}

export default App;
