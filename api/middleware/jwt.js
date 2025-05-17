import jwt from 'jsonwebtoken';
import fs from 'fs';

export const authenticateJWT = (token) => {
    return new Promise((resolve, reject) => {
        try {
            let path = './config.json';
            let SECRET_KEY = JSON.parse(fs.readFileSync(path)).SECRET_KEY;

            console.log("Inside JWT Secret Key : ", SECRET_KEY);
            console.log("Inside JWT Token : ", token);

            if (token) {
                jwt.verify(token, SECRET_KEY, (error, payload) => {
                    if (error) {
                        console.log('error inside verify method.');
                        console.log(error);
                        reject(error); // Reject the Promise with the error
                    } else {
                        console.log('verify Successful');
                        console.log("payload : ", payload);
                        resolve(payload.userId); // Resolve the Promise with the userId
                    }
                });
            } else {
                console.log('token not available.');
                reject('Token not available'); // Reject the Promise if token is not available
            }
        } catch (error) {
            console.error("error while reading secret key", error);
            reject(error); // Reject the Promise with the error
        }
    });
};


// -----------------------------------------
// import jwt from 'jsonwebtoken';
// import fs from "fs";

// export const aunthicateJWT = (token)=>{
//     console.log('inside authenticateJWT');
//     try{
//         let path = './config.json';
//         var SECRET_KEY =JSON.parse(fs.readFileSync(path)).SECRET_KEY;

//         console.log("Secret Key : ",SECRET_KEY);
//         console.log("--------------------------------\n Token : ",token)
//         if(token){
//             jwt.verify(token,SECRET_KEY,(error,payload)=>{//secret key not found
//                 if(error){
//                     console.log('error inside verify method.');
//                     console.log(error);
//                 }else{
//                     console.log('verify Successfull');
//                     console.log("payload : ",payload)
//                     return payload.userId;
//                 }
//             });
//         }else{
//             console.log('tocken not avilable.');
//         }
//     }catch(error){
//         console.error("error while reading secret key");
//     }
// }


