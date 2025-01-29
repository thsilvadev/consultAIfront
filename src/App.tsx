import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, FileText, Phone } from 'lucide-react';
import HomePage from './pages/HomePage';
import ExamForm from './pages/ExamForm';
import ContactPage from './pages/ContactPage';
import RoadmapPage from './pages/RoadmapPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exame" element={<ExamForm />} />
                <Route path="/contatos" element={<ContactPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
            </Routes>
        </Router>
    );
}

export default App;