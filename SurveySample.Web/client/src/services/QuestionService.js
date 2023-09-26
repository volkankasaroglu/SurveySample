import axios from "axios";

const baseUrl = `/api/` ;
const http = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-type": "application/json",
    },
});

const getSurveyQuestions = (surveyId) => {
    return http.get(`question/GetSurveyQuestions?surveyId=${surveyId}`);
};

const getById = (id) => {
    return http.get(`question?id=${id}`);
};

const create = (model) => {
    console.log("vvv");
    console.log(model);
    console.log("vvv");
    return http.post("question", model);
};

const update = (model, id) => {
    return http.put(`question?id=${id}`, { ...model });
};

const _delete = (id) => {
    return http.delete(`question?id=${id}`);
};

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response || typeof error.response.data !== "object") {
            setTimeout(() => { }, 1000);
            return Promise.reject(error);
        }
        const { status, config, data } = error.response;
        console.log(status, config, data);
    }
);

export const questionService = {
    getSurveyQuestions,
    getById,
    create,
    update,
    delete: _delete,
};
