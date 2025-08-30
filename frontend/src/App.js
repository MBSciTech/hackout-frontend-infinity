import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OrganizationForm from './pages/OrganizationForm/OrganizationForm';
import SolarPanel from './3dModels/SolarPanel';
import WindPower from './3dModels/WindPower';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'; // Add this import for your main layout styling

function App() {
  return (
    <Router>
      <div className='main-layout'> {/* This is the new parent container */}
        <Navbar/>
        <main className='main-content'> {/* This will hold all your page content */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/qna" element={<OrganizationForm/>} />
            <Route path="/solar" element={<SolarPanel/>} />
            <Route path="/wind" element={<WindPower/>} />
          </Routes>
        </main>
      </div>
      <Footer/> {/* Footer is placed outside the main layout for full-width */}
    </Router>
  );
}

export default App;