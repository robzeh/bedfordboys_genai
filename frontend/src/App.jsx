import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [count, setCount] = useState(0);

    const fetchDataFromServer = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    return (
        <>
            <h1 className="font-bold text-8xl">Welcome</h1>
            <div className="buttons mx-auto">
                <button className="mx-2">View Your Patients</button>
                <button>Add New Patient</button>
            </div>
        </>
    );
}

export default App;
