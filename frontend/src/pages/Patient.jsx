import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import Summary from "./Summary.jsx";

const Patient = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patients/${patientId}`);
        const data = await response.json();
        console.log(data);
        setPatient(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient:', error);
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  if (loading) {
    return <div></div>
  }

  const { firstName, lastName, email, description, mentalDisorder, age } = patient.basicInfo;
  const meetings = patient.meetings



  return (
    <div className="flex">
      <div className="w-5/12">
        <Summary/>
      </div>
      <div className="w-7/12 px-8">
        <div className="px-32 pt-12 max-w-max">
          <div className="patient-details">
            <div className="px-4 pt-4 sm:px-0 h-auto">
              <p className="text-4xl font-semibold leading-7 text-gray-900">Patient Details</p>
            </div>
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50 my-4" src={patient.basicInfo.avatarUrl} alt="" />
            <div className="mt-6 border-t border-gray-300">
              <dl className="divide-y divide-gray-300">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md font-semibold leading-6 text-gray-900">Patient ID</dt>
                  <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{patientId}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md font-semibold leading-6 text-gray-900">Full Name</dt>
                  <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{firstName} {lastName}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md font-semibold leading-6 text-gray-900">Age</dt>
                  <dd className="mt-1 text-md-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{age}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md font-semibold leading-6 text-gray-900">Email Address</dt>
                  <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md font-semibold leading-6 text-gray-900">Mental Disorder</dt>
                  <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{mentalDisorder}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md font-semibold leading-6 text-gray-900">Description</dt>
                  <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {description}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="past-conversations">
            <div className="px-4 pt-8 sm:px-0 h-auto">
              <p className="text-4xl font-semibold leading-7 text-gray-900">Past Conversations</p>
            </div>
            <ul role="list" className="divide-y divide-gray-300">
                {meetings.map((meeting) => (
                  <li key={meeting.meetingId} className="flex justify-between items-center gap-x-6 py-5 space-x-60">
                    <div className="flex min-w-0 gap-x-4 items-center">
                      <p className="font-semibold">{meeting.date}</p>
                      <div className="min-w-0">
                       {meeting.transcription.map((entry, index) => (
                          <li key={index}>
                            {index % 2 === 0 ? <span className="font-bold">Client:</span> : <span className="font-bold">You:</span>} {entry}
                          </li>
                        ))}
                        </div>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Patient;