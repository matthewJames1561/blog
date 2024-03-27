import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './components/NoPage';
import Layout from './layout/layout';
import Home from './components/Home';
import Blog from './components/Blog';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
