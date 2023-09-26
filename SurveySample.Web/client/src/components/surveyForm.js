import React, { useState } from "react";
import { SurveyService } from "../services/surveyService";

export function SurveyForm(props) {

    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const survey = Object.fromEntries(formData.entries());

        if (!survey.surveyTitle) {
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please enter the title for the survey
                </div>
            );
            return;
        }

        if (props.survey.id) {
            SurveyService
                .update(survey, props.survey.id)
                .then((response) => {
                    props.showSurveyList();
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        else {
            SurveyService
                .create(survey)
                .then((response) => {
                    console.log(response);
                    props.showSurveyList();
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    return (
        <>
            <h2 className="text-center mb-3"> {props.survey.id ? "Edit Survey Title" : "Create New Survey"}</h2>

            <div className="row">
                <div className="col-lg-6 mx-auto">
                    {errorMessage}
                    <form onSubmit={(event) => handleSubmit(event)}>
                        {props.survey.id && <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">id</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" name="id" defaultValue={props.survey.id} />
                            </div>
                        </div>}

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Survey Title</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="surveyTitle" defaultValue={props.survey.surveyTitle} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <button type="button" onClick={() => props.showSurveyList()} className="btn btn-secondary me-2">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}