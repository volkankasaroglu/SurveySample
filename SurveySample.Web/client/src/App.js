import { Navbar, Footer } from './components/layout';
import { Home } from './components/home';
import { Surveys } from './components/surveys';
import { Questions } from './components/questions';
import { SurveyView } from './components/surveyView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/questions/:surveyId"  element={<Questions />} />
                <Route path="/surveyview/:surveyId"  element={<SurveyView />} />
            </Routes>
            <Footer />         
        </BrowserRouter>
           
        </>

  );
}

export default App;
