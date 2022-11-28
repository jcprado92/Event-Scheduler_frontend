// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyCtYb0I4aPnZKPbB4bbQ0VB7rpHZqha06s",
    authDomain: "wellbell-4a40d.firebaseapp.com",
    projectId: "wellbell-4a40d",
    storageBucket: "wellbell-4a40d.appspot.com",
    messagingSenderId: "33154837166",
    appId: "1:33154837166:web:cffc47a7ec9154036edb3f",
    measurementId: "G-5YXH5XPXZ7"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//Access Firebase cloud messaging
const messaging = getMessaging(firebaseApp);
/*
This function allows us to get your device token from Firebase 
which is required for sending Push notifications to your device.
*/

export const getTokenFromFirebase = () => {
    return getToken(messaging, {
        vapidKey: "BP2vnUBO-X6Aw6KNtsS9Pst64XUuK_Pdscd70wrrylC_-g-oGW7nABQ6P-Mdr32jBL8isvGGB4Hn2MSb73DzwVk",
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log("current token for client: ", currentToken);
            } else {
                console.log(
                    "No registration token available. Request permission to generate one."
                );
            }
        })
        .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
        });
};
//This function listens to push messages on the server
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log(payload);
            resolve(payload);
        });
    });