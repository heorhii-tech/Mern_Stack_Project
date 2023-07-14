import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPage from './Components/EditPage';
import FullPage from './Components/FullPage';
import LogInPage from './Components/LogInPage';
import QuestionPage from './Components/QuestionPage';
import SignUpPage from './Components/SignUpPage';
import StartPage from "./Components/StartPage";
import {PrivateRoute, PublicRoutes} from "./config";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/edit_page/:id" element={<EditPage />} />
          <Route path="/fullPage/:id" element={<PrivateRoute><FullPage /></PrivateRoute>} />
          <Route path="/login" element={<PublicRoutes> <LogInPage /> </PublicRoutes>}/>
          <Route path="/questionPage" element={<PrivateRoute><QuestionPage /></PrivateRoute>} />
          <Route path="/signup" element={<PublicRoutes><SignUpPage /></PublicRoutes>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


