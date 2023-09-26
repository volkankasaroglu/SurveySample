import React, { useEffect, useState } from "react";
import { surveyService } from "../services/SurveyService";
import { Link } from "react-router-dom";

export function SurveyList(props) {
    const [surveys, setSurveys] = useState([]);

    function fetchSurveys() {
        surveyService
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
        surveyService
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
            <h2 className="text-center mb-3"> List Of Surveys</h2>
            <button type="button" onClick={() => props.showSurveyForm({})} className="btn btn-primary me-2">Create</button>
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
                                        <button type="button" onClick={() => props.showSurveyForm(survey)} className="btn btn-primary btn-sm me-2">Edit Title</button>
                                        <Link to={`/questions/${survey.id}`}>
                                            <button className="btn btn-primary btn-sm me-2">Content</button>
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
