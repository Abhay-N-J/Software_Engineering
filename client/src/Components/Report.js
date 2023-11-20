import { useEffect, useState } from "react";
import Axios from "../Misc/Axios";
import { getToken } from "../Misc/Tokens";
import { useLocation } from "react-router-dom";

// Function to calculate the percentage of each answer option
const calculatePercentage = (total, selected) => {
  return ((selected / total) * 100).toFixed(2);
};

// Component to render the analysis for a single question
export const QuestionAnalysis = ({question, answers}) => {
    
    const totalAnswers = answers.length;

    // For text questions, display the responses
    if (question.type === '2') {
        return (
        <div >
            <h3>{question.question}</h3>
            <ul>
            {answers.map((answer, index) => (
                <li key={index}>{answer}</li>
            ))}
            </ul>
        </div>
        );
    }

    // For radio and checkbox questions, calculate percentages
    if (question.type === '0') {
        const options = question.options;

        return (
        <div>
            <h3>{question.question}</h3>
            <ul>
            {options.map((option, index) => (
                <li key={index}>
                {option}: {calculatePercentage(totalAnswers, answers.filter((ans) => ans.includes(option)).length)}%
                </li>
            ))}
            </ul>
        </div>
        );
    }
     if (question.type === '1') {
            const options = question.options;
    
            return (
            <div>
                <h3>{question.question}</h3>
                <ul>
                {options.map((option, index) => (
                    <li key={index}>
                    {option}: {calculatePercentage(totalAnswers, answers.filter((ans) => ans === option).length)}%
                    </li>
                ))}
                </ul>
            </div>
            );
    }

    return null;
};

// Component to render the overall analysis
const SurveyAnalysis = ({questions, answers}) => {
    return (
        <div>
        <h2>Survey Analysis</h2>
        {questions.map((question, index) => (
            <QuestionAnalysis key={index} question={question} answers={answers.map((ans) => ans[index])} />
        ))}
        </div>
    );
    };

    // Main component to render the report page
export const ReportPage = () => {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const survey = location.state.survey 
        Axios.get('/survey', {params: {survey: survey, user: getToken().user}})
        .then(res => setQuestions(res.data.survey)).catch(e => console.log(e))
        Axios.get('/answers',{params: {survey: survey, user: getToken().user}})
        .then(res => setAnswers(res.data.answers)).catch(e => console.log(e))
    }, [location])

    return (
        <div>
        <h1>Survey Report</h1>
        <SurveyAnalysis questions={questions} answers={answers} />
        </div>
    );
};
