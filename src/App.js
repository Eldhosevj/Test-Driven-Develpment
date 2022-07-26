import logo from './logo.svg';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import HomePage  from './pages/HomePage';
function App() {
  return (
    <>
    <HomePage/>
    {window.location.pathname==="/signUp"&&<SignUpPage/>}
    </>
    
  );
}

export default App;
