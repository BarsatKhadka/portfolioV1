import { Header } from "./components/Header"
import { Experience} from "./components/Experience"
import { Projects } from "./components/Projects"
import { Footer } from "./components/Footer"
function App() {
  return (
    <>
    <div className="pb-16">
      <Header/>
      <Experience/>
      <Projects/>
      <Footer/>
      </div>
    
    </>
  )
}

export default App
