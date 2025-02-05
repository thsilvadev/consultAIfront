import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExamForm from './pages/ExamForm';
import ContactPage from './pages/ContactPage';
import RoadmapPage from './pages/RoadmapPage';

function App() {
    console.log("app rendered.")
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