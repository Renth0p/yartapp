import './App.css';
import {useEffect} from "react";
import Layout from "./components/Layout.jsx";
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditPostPage from "./pages/EditPostPage";
import {useDispatch} from "react-redux";
import {getMe} from "./redux/features/auth/authSlice";


function App() {

   const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

  return (
      <Layout>
        <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/posts'} element={<PostsPage />} />
            <Route path={':id'} element={<PostPage />} />
            <Route path={'new'} element={<AddPostPage />} />
            <Route path={'login'} element={<LoginPage />} />
            <Route path={'register'} element={<RegisterPage />} />
            <Route path={':id/edit'} element={<EditPostPage />} />
        </Routes>

          <ToastContainer position={'bottom-left'} />
      </Layout>
  );
}

export default App;
