import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import { DashBoard,Landing,Register,Error } from "./pages";


const App=()=> {
  return (
  <BrowserRouter>
  {/* <nav>
    <Link to='/'>DashBoard</Link>
    <Link to="/register">Register</Link>
    <Link to="/landing">Landing</Link>
  </nav> */}
  <Routes>
    <Route path="/" element={<DashBoard/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/landing" element={<Landing/>}/>
    <Route path="*" element={<Error/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
