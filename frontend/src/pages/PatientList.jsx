import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/patients");
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <div>
          <h1 className="mb-8 text-black text-center">Your Patients 🧑‍⚕️</h1>
          <ul role="list" className="divide-y divide-gray-300">
            {patients.map((patient) => (
              <li key={patient.patientId} className="flex justify-between items-center gap-x-6 py-5 space-x-60">
                <div className="flex min-w-0 gap-x-4 items-center">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={patient.basicInfo.avatarUrl} alt="" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{patient.basicInfo.firstName} {patient.basicInfo.lastName}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{patient.basicInfo.email}</p>
                  </div>
                </div>
                <div className="sm:flex sm:flex-col sm:items-end">
                  <Link className="inline-block text-black hover:text-black" to={`/patient/${patient.patientId}`}>
                      View Your Patient
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>

  );
};

export default PatientList;