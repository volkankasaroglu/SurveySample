import axios from "axios";

const baseUrl = `/api/` ;
const http = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-type": "application/json",
    },
});

const getAll = () => {
    return http.get("survey");
};

const getById = (id) => {
    return http.get(`survey?id=${id}`);
};

const create = (model) => {
    return http.post("survey", model);
};

const update = (model, id) => {
    return http.put(`survey?id=${id}`, { ...model });
};

const _delete = (id) => {
    return http.delete(`survey?id=${id}`);
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

export const surveyService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};
