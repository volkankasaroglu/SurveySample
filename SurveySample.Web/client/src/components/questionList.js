import React, { useEffect, useState } from "react";
import { QuestionService } from "../services/questionService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function QuestionList(props) {
    const [questions, setQuestions] = useState([]);
    const param = useParams();

    function fetchQuestions() {
        QuestionService
            .getSurveyQuestions(param.surveyId)
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(() => fetchQuestions());

    function deleteQuestion(id) {
        QuestionService
            .delete(id)
            .then((response) => {
                fetchQuestions();
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <>
            <h2 className="text-center mb-3"> Survey Contents</h2>
            <div className="d-flex align-items-center">
                <Link to={"/surveys"}>
                    <button className="btn btn-secondary me-2">Back to Surveys</button>
                </Link>
                <div className="ms-auto">
                    <button type="button" onClick={() => props.showQuestionForm({})} className="btn btn-primary me-2">Add Question</button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Question Text</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) => {
                            return (
                                <tr key={index}>
                                    <td>{question.questionText}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <button type="button" onClick={() => props.showQuestionForm(question)} className="btn btn-primary btn-sm me-2">Edit</button>
                                        <button type="button" onClick={() => deleteQuestion(question.id)} className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}