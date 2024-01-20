import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Summary from "./pages/Summary";
import PatientList from "./pages/PatientList";
import Goals from "./pages/Goals";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

const App = () => {
    const [count, setCount] = useState(0);

    const fetchDataFromServer = async () => {
        try {
            const requestBody = {
                key1: "value1",
                key2: "value2",
                key3: "value3",
            };

            axios
                .post("http://localhost:3000/generate", requestBody)
                .then((response) => {
                    // Handle the success response
                    console.log("Response:", response.data);
                })
                .catch((error) => {
                    // Handle the error
                    console.error("Error:", error.message);
                });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/summary" element={<Summary />} />
                    <Route path="/patient" element={<PatientList />} />
                    <Route path="/patient/:id" element={<Patient />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
