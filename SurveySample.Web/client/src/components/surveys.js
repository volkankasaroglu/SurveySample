import React, { useEffect, useState } from "react";
import { surveyService } from "../services/SurveyService";
import { Questions, QuestionList } from "../components/questions";
import { Link } from "react-router-dom";

export function Surveys() {
    const [content, setContent] = useState(<SurveyList  showSurveyForm={showSurveyForm} />);

    function showSurveyList(){
        setContent(<SurveyList showSurveyForm={showSurveyForm} />);
    }
    function showSurveyForm(survey){
        setContent(<SurveyForm survey={survey} showSurveyList={showSurveyList} />);
    }

    return (
        <div className="container my-5">
            {content}
        </div>
    );
}

function SurveyList(props) {
    const [surveys, setSurveys] = useState([]);

    function fetchSurveys(){
        surveyService
        .getAll()
        .then((response) => {
            setSurveys(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    useEffect(() => fetchSurveys(),[]);

    function deleteSurvey(id){
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
            <button type="button" onClick={()=>props.showSurveyForm({})} className="btn btn-primary me-2">Create</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Survey Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        surveys.map((survey, index) =>{
                            return(
                                <tr key={index}>
                                    <td>{survey.surveyTitle}</td>
                                    <td style={{width: "10px", whiteSpace:"nowrap"}}>
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

function SurveyForm(props){

    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event){
        event.preventDefault();

        //read form data
        const formData = new FormData(event.target);
        //convert formData to object
        const survey = Object.fromEntries(formData.entries());

        //form validation
        if(!survey.surveyTitle){
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Please enter the title for the survey
                </div>
            );
            return;
        }

        //post and save data
        if(props.survey.id){
            surveyService
            .update(survey, props.survey.id )
            .then((response) => {
                props.showSurveyList();
            })
            .catch((error) => {
                console.log(error.response);
            });
        }
        else{
            surveyService
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
            <h2 className="text-center mb-3"> {props.survey.id ? "Edit Survey" : "Create New Survey"}</h2>

            <div className="row">
                <div className="col-lg-6 mx-auto">
                    {errorMessage}
                    <form onSubmit={(event) => handleSubmit(event)}> 
                        {props.survey.id && <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">id</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" name="id" defaultValue={props.survey.id}/>
                            </div>
                        </div>}

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Survey Title</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="surveyTitle" defaultValue={props.survey.surveyTitle}/>
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