import axios from "axios";

export const uploadQuestion = async (questionData) =>{
    const url = 'http://localhost:42125/api/Posts';
    console.log(questionData);
    const response = await axios.post(url,questionData);
    const returnedData = await response.data;
    console.log(returnedData);
    return returnedData;
}