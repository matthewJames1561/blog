import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './components/NoPage';
import Layout from './layout/layout';
import Home from './components/Home';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import AuthRoute from './components/authComponents/AuthRoute';
import AuthProvider from './components/authComponents/AuthProvider';
import BlogEditor from './components/BlogEditor';
import BlogPost from './components/BlogPost';
import Dev from './components/Dev';


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/create" element={<AuthRoute><CreateBlog /></AuthRoute>}></Route>
            <Route path="/create/:id" element={<AuthRoute><CreateBlog /></AuthRoute>}></Route>
            <Route path="/edit" element={<AuthRoute><BlogEditor /></AuthRoute>}></Route>
            <Route path="/dev" element={<Dev/>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
