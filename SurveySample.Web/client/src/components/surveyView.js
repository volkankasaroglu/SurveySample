import React, { useEffect, useState } from 'react';
import Poll from 'react-polls';
import { QuestionService } from "../services/questionService";
import { VoteService } from "../services/voteService";
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

export function SurveyView() {

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
    return data.map((item, index) => ({
      question: `${index + 1}. ${item.questionText}`,
      answers: item.questionOptions.map(option => ({
        option: option.optionText,
        votes: option.voteCount,
        id: option.id
      }))
    }));
  }

  const handleVote = (voteAnswer, pollIndex) => {
    const newPollQuestions = pollQuestions.map((poll, index) => {
      if (index === pollIndex) {
        poll.answers = poll.answers.map(answer => {
          if (answer.option === voteAnswer) {
            answer.votes++;
            VoteService.addVote(answer.id)
              .then(() => {
                console.log("Vote updated in the database.");
              })
              .catch(error => {
                console.error("Error updating vote:", error);
              });
          }
          return answer;
        });
      }
      return poll;
    });
    setPollQuestions(newPollQuestions);
  };

  return (
    <>
      <div className="col-6 mx-auto d-flex align-items-center">
          <Link to={"/surveys"}>
              <button className="btn btn-secondary me-2">{"<<"}</button>
          </Link>
          <div className="ms-auto">
          <Link to={"/surveyresults/"+ (survey && survey.id)}>
              <button className="btn btn-success me-2">Results Table</button>
          </Link>
          </div>
      </div>
      <h1 className="text-center text-primary">{survey && survey.surveyTitle}</h1>
      <div className="col-6 mx-auto">
        {pollQuestions.map((poll, index) => (
          <Poll
            key={index}
            question={poll.question}
            answers={poll.answers}
            onVote={voteAnswer => handleVote(voteAnswer, index)}
            customStyles={pollStyle}
            noStorage
          />
        ))}
      </div>
    </>
  );
}
