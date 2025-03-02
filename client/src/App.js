import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='*' element={<LoginForm/>}/>
        </Routes>
      </Router>


    </div>
  );
}

export default App;