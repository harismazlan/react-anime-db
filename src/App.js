import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import AnimeDetail from './pages/AnimeDetail';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;