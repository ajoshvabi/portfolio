// App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AboutScreen } from './components/About'; // Create this new component
import { Portfolio } from './components/Portfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about" element={<AboutScreen />} />
        {/* Add more routes as needed, e.g., <Route path="/projects" element={<Projects />} /> */}
      </Routes>
    </Router>
  );
}

export default App;