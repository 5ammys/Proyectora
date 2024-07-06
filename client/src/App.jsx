import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/register';
import LoginPage from './pages/login.jsx';
import MainPage from './pages/main.jsx';
import { AuthProvider } from './context/authContext.jsx'
import AddSong from './components/AddSong.jsx';
import EditSong from './components/EditSong.jsx';
import DeleteSong from './components/DeleteSong.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { SongProvider } from './context/songContext.jsx';


function App() {
  return (
    <AuthProvider>
      <SongProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/main' element={<MainPage />} />
              <Route path='/add' element={<AddSong />}></Route>
              <Route path='/edit' element={<EditSong />}></Route>
              <Route path='/delete' element={<DeleteSong />}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
      </SongProvider>
    </AuthProvider>
  );
}

export default App;