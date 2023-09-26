import React, { useEffect, useState } from 'react';
import { QuestionService } from "../services/questionService";
import { SurveyService } from "../services/surveyService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const pollStyle = {
  questionSeparator: true,
  questionSeparatorWidth: '5px',
  questionBold: false,
  questionColor: '#303030',
  align: 'left',
  theme: 'black'
}

export function SurveyResults() {

  const [pollQuestions, setPollQuestions] = useState([]);
  const [survey, setSurvey] = useState();
  const param = useParams();

  function getSurvey() {
    SurveyService
      .getById(param.surveyId)
      .then((response) => {
        setSurvey(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getSurvey();
  }, []);

  function fetchSurvey() {
    if (survey && survey.id) {
      QuestionService
        .getSurveyQuestions(survey.id)
        .then((response) => {
          setPollQuestions(transformToPollData(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  useEffect(() => {
    if (survey) {
      fetchSurvey();
    }
  }, [survey]);

  function transformToPollData(data) {
    return data.map(item => ({
      question: item.questionText,
      answers: item.questionOptions.map(option => ({
        option: option.optionText,
        votes: option.voteCount,
        id: option.id
      }))
    }));
  }

  return (
    <>
      <div className="col-6 mx-auto d-flex align-items-center">
        <Link to={"/surveys"}>
          <button className="btn btn-secondary me-2">{"<<"}</button>
        </Link>
      </div>
      <div className="container col-6 mx-auto mt-5" style={{ maxWidth: '50%', margin: '0 auto' }}>
        <h2 className="text-center text-primary">{survey && survey.surveyTitle}</h2>
        <table className="table table-bordered">
          {pollQuestions.map((poll, index) => (
            <tbody key={index}>
              <tr>
                <td colSpan="2" className="fw-bold text-secondary">{index + 1}. {poll.question}</td>
              </tr>
              {poll.answers.map((answer, aIndex) => (
                <tr key={aIndex}>
                  <td className="text-dark" style={{ width: '80%' }}>{answer.option}</td>
                  <td style={{ width: '20%' }}>{answer.votes}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </>


  );
}
