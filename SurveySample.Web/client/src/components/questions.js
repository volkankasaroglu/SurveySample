import React, { useEffect, useState } from "react";
import { questionService } from "../services/QuestionService";
import { useParams } from "react-router-dom";
import AddRemoveOptionField from "./addRemoveOptionField";

export function Questions() {
    const param  = useParams();
    const [content, setContent] = useState(<QuestionList surveyId={param.surveyId} showQuestionForm={showQuestionForm}/>);

    function showQuestionList(){
        setContent(<QuestionList surveyId={param.surveyId} showQuestionForm={showQuestionForm}/>);
    }
    function showQuestionForm(question){
        setContent(<QuestionForm question={question} showQuestionList={showQuestionList}/>);
    }

    return (
        <div className="container my-5">
            {content}
        </div>
    );
}

export function QuestionList(props) {
    const [questions, setQuestions] = useState([]);
    const param  = useParams();

    function fetchQuestions(){
        questionService
            .getSurveyQuestions(param.surveyId)
        .then((response) => {
            setQuestions(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    useEffect(() => fetchQuestions(), [param.surveyId]);

    function deleteQuestion(id){
        questionService
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
            <h2 className="text-center mb-3"> Survey Content</h2>
            <button type="button" onClick={()=>props.showQuestionForm({})} className="btn btn-primary me-2">Add Question</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Question Text</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) =>{
                            return(
                                <tr key={index}>
                                    <td>{question.questionText}</td>
                                    <td style={{width: "10px", whiteSpace:"nowrap"}}>
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

function QuestionForm(props){

    const [errorMessage, setErrorMessage] = useState("");
    const param  = useParams();

    function handleSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());
    
        const questionText = formObject.questionText; 
        const optionsArray = Object.entries(formObject)
        .filter(([key, value]) => key.startsWith("option-"))
        .map(([key, value], index) => ({
            optionText: value,
            id: formObject["optionId-" + index] ? parseInt(formObject["optionId-" + index], 10) : 0
        }));
        const surveyId = formObject.surveyId; 

        // Form validation
        if (!questionText) {
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please enter text for the question
                </div>
            );
            return;
        }
        console.log("ww")
        console.log(optionsArray)
        console.log("ww")
        const questionData = {
            questionText: questionText,
            questionOptions: optionsArray,
            surveyId: parseInt(formObject.surveyId, 10)
        };

        // Post and save data
        if (props.question.id) {
            questionService.update(questionData, props.question.id)
                .then((response) => {
                    props.showQuestionList();
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else {
            questionService.create(questionData)
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
                        {props.question.id && <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">id</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" name="id" defaultValue={props.question.id}/>
                            </div>
                        </div>}

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Question Text</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="questionText" defaultValue={props.question.questionText}/>
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