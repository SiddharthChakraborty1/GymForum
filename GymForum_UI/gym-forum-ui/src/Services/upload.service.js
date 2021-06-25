import axios from "axios";

export const uploadQuestion = async (questionData) =>{
    const url = 'http://localhost:42125/api/Posts';
    console.log(questionData);
    const response = await axios.post(url,questionData);
    const returnedData = await response.data;
    console.log(returnedData);
    return returnedData;
}

export const getPosts = async()=>{
    const url = 'http://localhost:42125/api/Posts';
    const response = await axios.get(url);
    const returnedData = response.data;
    console.log(returnedData);
    return returnedData;
}

export const getUserByUserId = async(userId) =>{
    const url = 'http://localhost:42125/api/Users/'+userId;
    const response = await axios.get(url);
    const returnedData = await response.data;
    return returnedData;
}

export const uploadAnswer = async(answerData) =>{
    const url = 'http://localhost:42125/api/Answers';
    const response = await axios.post(url,answerData);
    const returnedData = await response.data;
    console.log(returnedData);
    return returnedData;
}

export const getAnswersByPostId = async(postId) =>{
    const url = 'http://localhost:42125/api/Answers/PostId/'+postId;
    const response = await axios.get(url);
    const returnedData = response.data;
    console.log(returnedData);
    return returnedData;
}

export const updateAnswer = async(answerData) =>{
    const url = 'http://localhost:42125/api/Answers/'+answerData.AnswerId;
    const response = await axios.put(url, answerData);
    console.log(response);
    return response;
}