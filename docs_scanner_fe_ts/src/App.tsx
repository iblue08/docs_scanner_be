import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DeviceList from './components/pages/DeviceList/DeviceList';
import AppBar from './components/shared/appbar/Appbar';
import DeviceCount from './components/pages/DeviceCount/DeviceCount';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path='/home' element={<DeviceList />}/>
          <Route path='/device/:id' element={<DeviceCount />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
