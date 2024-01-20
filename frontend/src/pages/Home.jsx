import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1 className="font-bold text-8xl">Welcome</h1>
            <div className="buttons mx-auto">
                <button className="mx-2">
                    <Link to={'/patient'}>
                        View Your Patients
                    </Link>
                </button>
                <button>Add New Patient</button>
            </div>
        </>
    )
}

export default Home;