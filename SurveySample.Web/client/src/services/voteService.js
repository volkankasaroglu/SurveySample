import axios from "axios";

const baseUrl = `/api/` ;
const http = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-type": "application/json",
    },
});

const addVote = (optionId) => {
    return http.put(`question/Vote/Add/${optionId}`);
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

export const VoteService = {
    addVote,
};
