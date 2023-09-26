import React, { useEffect, useState } from "react";
import { SurveyService } from "../services/surveyService";
import { Link } from "react-router-dom";

export function SurveyList(props) {
    const [surveys, setSurveys] = useState([]);

    function fetchSurveys() {
        SurveyService
            .getAll()
            .then((response) => {
                setSurveys(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(() => fetchSurveys(), []);

    function deleteSurvey(id) {
        SurveyService
            .delete(id)
            .then((response) => {
                console.log(response);
                fetchSurveys();
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <>
            <h2 className="text-center mb-3"> Surveys List</h2>
            <div className="d-flex align-items-center">
                <div className="ms-auto">
                    <button type="button" onClick={() => props.showSurveyForm({})} className="btn btn-success me-2">New Survey</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Survey Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        surveys.map((survey, index) => {
                            return (
                                <tr key={index}>
                                    <td>{survey.surveyTitle}</td>
                                    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                        <Link to={`/surveyview/${survey.id}`}>
                                            <button className="btn btn-primary btn-sm me-2">View Survey</button>
                                        </Link>
                                        <button type="button" onClick={() => props.showSurveyForm(survey)} className="btn btn-primary btn-sm me-2">Change Title</button>
                                        <Link to={`/questions/${survey.id}`}>
                                            <button className="btn btn-primary btn-sm me-2">Edit Contents</button>
                                        </Link>
                                        <button type="button" onClick={() => deleteSurvey(survey.id)} className="btn btn-danger btn-sm">Delete</button>
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
