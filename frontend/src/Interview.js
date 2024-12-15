import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Interview() {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        axios.get('http://localhost/api/questions.php')
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des questions:', error);
            });
    }, []);

    const handleResponseChange = (questionId, response) => {
        setResponses({
            ...responses,
            [questionId]: response
        });
    };

    const handleSubmit = () => {
        axios.post('http://localhost/api/submit_responses.php', responses)
            .then(() => {
                alert('Réponses soumises avec succès!');
            })
            .catch(error => {
                console.error('Erreur lors de la soumission des réponses:', error);
            });
    };

    return (
        <div>
            <h1>Entretien</h1>
            {questions.map((question) => (
                <div key={question.id}>
                    <p>{question.question}</p>
                    <input
                        type="text"
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}>Soumettre les réponses</button>
        </div>
    );
}

export default Interview;
