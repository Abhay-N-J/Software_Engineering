import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Axios from "../Misc/Axios";
import { Button, ToggleButton, ToggleButtonGroup, Form } from "react-bootstrap";

export const View = () => {
    const loc = useLocation()
    const [state, setState] = useState({});
    const [error, setError] = useState(true)
    const [answers, setAnswers] = useState([])

    const handleChange = (value) => {
        setAnswers(value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(loc.search)
        const body = {
            answers: answers,
            user: params.get('user'),
            survey: params.get('survey')
        }
        console.log(body)
        Axios.put('/submit', body,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        }).then(res => {
            console.log(res)
            if (res?.data?.error === false) {
                alert("Form Submit successfully")
            }
            else {
                alert(res.data.error)
            }
        }).catch(e => {
            if (e?.response?.data?.error !== undefined )
                alert(e?.response?.data?.error)
            else 
                alert(e.toString())
        })
    }

    useEffect(() => {
            const params = new URLSearchParams(loc.search)
            const survey = params.get('survey')
            const user = params.get('user')
            Axios.get('/survey', { params: {survey: survey, user: user}})
            .then((res) => {
                setState(res.data.survey)
                setError(false)
            })
            .catch(err => {
                setError(true)
                setState(err.response.data.error)
            }) 
    }, [loc.search])

    if (error) {
        return (
            <>
                <span>Error in fetching survey</span>
                <p>{state.error}</p>
            </>
        )
    }
    else {
        return (
            <>
                <SurveyForm surveyData={state} onChange={handleChange} answers={answers} onSubmit={onSubmit}/>
            </>
        )
    }

}

export const SurveyForm = ({ surveyData, onChange, onSubmit, answers}) => {
  const handleInputChange = (questionIndex, value) => {
    // Handle the form input changes here
    console.log(`Selected value for question ${questionIndex + 1}: ${value}`);
    answers[questionIndex] = value
    onChange(answers)
  };

  return (
    <Form className="text-center" onSubmit={onSubmit}>
      {surveyData.map((question, questionIndex) => (
        <div key={questionIndex}>
          <Form.Group>
            <Form.Label>{question.question}</Form.Label>
            <br></br>
            {question.type === '0' ? (
              // Checkbox type
              <ToggleButtonGroup
                type="checkbox"
                onChange={(value) => handleInputChange(questionIndex, value)}
              >
                {question.options.map((option, optionIndex) => (
                  <ToggleButton key={optionIndex} id={`check-${optionIndex}`} value={option}>
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            ) : question.type === '1' ? (
              // Radio button type
              <ToggleButtonGroup
                type="radio"
                name={`question-${questionIndex}`}
                onChange={(value) => handleInputChange(questionIndex, value)}
              >
                {question.options.map((option, optionIndex) => (
                  <ToggleButton key={optionIndex} id={`radio-${optionIndex}`} value={option}>
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            ) : (
              // Other input types
              <Form.Control
                as="textarea"
                style={{maxWidth: "20%"}}
                rows={3}
                className="customFormControl mx-auto"
                onChange={(e) => handleInputChange(questionIndex, e.target.value)}
              />
            )}
          </Form.Group>
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

