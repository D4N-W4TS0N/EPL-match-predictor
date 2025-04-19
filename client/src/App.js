import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/HomePage';
import ChooseTeam from './components/ChooseTeam';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='*' element={<LoginForm/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/choose-team' element={<ChooseTeam/>}/>
        </Routes>
      </Router>


    </div>
  );
}

export default App;