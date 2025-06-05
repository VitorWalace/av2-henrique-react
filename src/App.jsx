import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario/:id" element={<UserDetail />} />
       <Route path="/favoritos/" element={<Favoritos/>} />
      </Routes>
    </Router>
  );
}
import Favoritos from "./pages/Favoritos";

// dentro do <Routes>
<Route path="/favoritos" element={<Favoritos />} />


export default App;
