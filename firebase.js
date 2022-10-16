import * as firebase from "firebase";
import "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDjrEJAdnO7zm0plVu9E1P2LsqZ0_dbDdE",
    authDomain: "zapi-4ccfe.firebaseapp.com",
    projectId: "zapi-4ccfe",
    storageBucket: "zapi-4ccfe.appspot.com",
    messagingSenderId: "944386232119",
    appId: "1:944386232119:web:c06bcd293068f8f25694b2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider};
export default db;