import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="text-center mx-auto">
        <h1 className="font-bold text-8xl mb-6 text-black">Welcome</h1>
        <div className="buttons">
          <button className="mx-2">
            <Link to="/patient">
              View Your Patients
            </Link>
          </button>
          <button>Add New Patient</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
