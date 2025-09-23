import './App.css';
import Home from './pages/home';
import BlogDetails from './pages/blogDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    <div className='App'>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Home Page Route */}
          <Route path='/' element={<Home />} />
          {/* Blog Details route */}
          <Route path='/blog/:id' element={<BlogDetails />} />
          {/* Page not found */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;