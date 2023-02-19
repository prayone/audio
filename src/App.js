import './App.css';
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import RoutesIdx from './router/index'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      {
        RoutesIdx.map(item=><Route key={item.path} path={item.path} element={<item.component/>} />)
      }
  </Routes>
  </BrowserRouter>

  );
}

export default App;
