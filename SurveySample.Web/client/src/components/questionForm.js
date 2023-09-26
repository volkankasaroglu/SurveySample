import React, { useState } from "react";
import { QuestionService } from "../services/questionService";
import { useParams } from "react-router-dom";
import AddRemoveOptionField from "./addRemoveOptionField";

export function QuestionForm(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const param = useParams();
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        const questionText = formObject.questionText;
        const questionId = formObject.id;
        const optionsArray = Object.entries(formObject)
            .filter(([key, value]) => key.startsWith("option-"))
            .map(([key, value], index) => ({
                optionText: value,
                id: formObject["optionId-" + index] ? parseInt(formObject["optionId-" + index], 10) : 0
            }));

        const inputElements = document.querySelectorAll('input[type="text"]');

        for (const input of inputElements) {
            if (input.value.trim() === '') {
                setErrorMessage(
                    <div className="alert alert-warning" role="alert">
                        Please enter all fields for the question
                    </div>
                );
                return;
            }
        }

        const questionData = {
            id: questionId,
            questionText: questionText,
            questionOptions: optionsArray,
            surveyId: parseInt(formObject.surveyId, 10)
        };

        if (props.question.id) {
            QuestionService.update(questionData, props.question.id)
                .then((response) => {
                    props.showQuestionList();
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else {
            QuestionService.create(questionData)
                .then((response) => {
                    props.showQuestionList();
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    return (
        <>
            <h2 className="text-center mb-3"> {props.question.id ? "Edit Question" : "Add New Question"}</h2>

            <div className="row">
                <div className="col-lg-6 mx-auto">
                    {errorMessage}
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <input type="hidden" name="surveyId" defaultValue={param.surveyId} />
                        {props.question.id && <input type="hidden" name="id" defaultValue={props.question.id} />}

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Question Text</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="questionText" type="text" defaultValue={props.question.questionText} />
                                <div className="row"><AddRemoveOptionField initialOptions={props.question.questionOptions} /></div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary btn-sm me-3">Save</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <button type="button" onClick={() => props.showQuestionList()} className="btn btn-secondary me-2">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}