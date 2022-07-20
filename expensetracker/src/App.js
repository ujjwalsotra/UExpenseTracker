import './App.css';
import '../node_modules/antd/dist/antd.css'
import {BrowserRouter , Navigate, Route , Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>

        </Routes>

      </BrowserRouter>


    </div>
  );
}
export function ProtectedRoute(props) 
{
  if(localStorage.getItem('expenses-user'))
  {
    return props.children;
  }
  else
  {
    return <Navigate to='/login'/>
  }
}

export default App;
