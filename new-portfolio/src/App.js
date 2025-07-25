import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar />
    {/* <Routes>
      <Route path="/" element={<Blog/>}/>
    </Routes> */}
    <h1 className="text-3xl font-bold underline">
      Hello All!
    </h1>
    </>
  );
}

export default App;
