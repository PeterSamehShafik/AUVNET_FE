import axios from "axios";

export default axios.create({
    withCredentials: true,
    baseURL: 'https://auvnet-internship-assessment-be-fofx.vercel.app/api'
});