import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ComponentsPage from "./components/ComponentsPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
            <Route path='/dashboard' element={<ComponentsPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;