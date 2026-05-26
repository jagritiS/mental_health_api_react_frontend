import axios from "axios";

const api = axios.create({
    baseURL: "https://mental-health-api-django-render.onrender.com/api",
});

export default api;