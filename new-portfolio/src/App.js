import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs />
      <Contact />
      <Footer />
    </>
  );
}

export default App;