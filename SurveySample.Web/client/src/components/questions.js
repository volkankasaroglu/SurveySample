import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionList } from "./questionList";
import { QuestionForm } from "./questionForm";

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
