import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar"
import TaskPage from "./page/Task"
import UserLogin from "./page/User"
import PrivateRoute from './PrivateRoute'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar count={count} />
        <Routes>
          <PrivateRoute path="/" element={<TaskPage setCount={setCount} />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
