import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
//require('dotenv').config()


const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,

    authDomain: process.env.REACT_APP_AUTHDOMAIN,

    projectId: "taskmanager-6d543",

    storageBucket: process.env.REACT_APP_STORAGEBUCKET,

    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,

    appId: process.env.REACT_APP_APPID,

    measurementId: process.env.RACT_APP_MEASUREMENTID

};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { db };
