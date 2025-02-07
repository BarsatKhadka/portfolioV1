import { Header } from "./components/Header";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HowToCLI } from "./components/grmsComponents/HowToCLI";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
    <Analytics/>
    <Router>
      <Routes>
        <Route 
          path="/HowToCLI" 
          element={<HowToCLI />}
        />
        <Route 
          path="/" 
          element={
            <div className="pb-16">
              <Header />
              <Experience />
              <Projects />
              <Footer />
            </div>
          } 
        />
      </Routes>
    </Router>
    <Analytics/>
    </>
  );
}

export default App;
