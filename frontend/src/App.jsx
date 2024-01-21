import { useState, useEffect } from "react";
import axios from "axios";
import Summary from "./pages/Summary"
import PatientList from "./pages/PatientList"
import Goals from "./pages/Goals"
import Home from "./pages/Home"
import Patient from "./pages/Patient"
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";

const App = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/summary" element={<Summary />} />
                    <Route path="/patient" element={<PatientList />} />
                    <Route path="/patient/:patientId" element={<Patient />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
