import axios from "axios";

export const registerUserWithEmail = async(userData) =>{
    let url = 'http://localhost:42125/api/Users/email/'+userData.UserEmail;
    const response = await axios.post(url,userData);
    const returnedData = await response.data;
    console.log(returnedData);
    return returnedData;
}


export const loginUserWithEmail = async(userData) =>{
    let url = 'http://localhost:42125/api/Users/email/'+userData.UserEmail;
    const response = await axios.get(url);
    const returnedData = await response.data;
    return returnedData;
    
    // if(returnedData.userPassword === userData.UserPassword)
    // {
    //     alert('Logged in successfully')
    // }
    // else if (returnedData.userId === -1)
    // {
    //     alert('User Does not exist')
    // }
    // else if(returnedData.UserPassword !== userData.UserPassword)
    // {
    //     alert('Incorrect Password');
    // }
    // console.log(returnedData);
}
