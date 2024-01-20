import { useParams } from 'react-router-dom';

const Patient = () => {
    const { id } = useParams();

    return (
        <div>
            <h2>Patient Details for ID: {id}</h2>
        </div>
    );
}

export default Patient;