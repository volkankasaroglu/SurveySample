import React, { useState } from "react";
import { SurveyList } from "../components/surveyList";
import { SurveyForm } from "../components/surveyForm";

export function Surveys() {
    const [showForm, setShowForm] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    function showSurveyList() {
        setShowForm(false);
    }
    function showSurveyForm(survey) {
        setSelectedSurvey(survey);
        setShowForm(true);
    }

    return (
        <div className="container my-5">
            {showForm ? <SurveyForm survey={selectedSurvey} showSurveyList={showSurveyList} /> : <SurveyList showSurveyForm={showSurveyForm} />}
        </div>
    );
}
