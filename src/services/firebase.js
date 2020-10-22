import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firebase-firestore'



const firebaseConfig= {
    apiKey: "AIzaSyBAspEDZbU4jrhXV6DzjQiJcYY83_VBoZc",
    authDomain: "mycatalog-com.firebaseapp.com",
    databaseURL: "https://mycatalog-com.firebaseio.com",
    projectId: "mycatalog-com",
    storageBucket: "mycatalog-com.appspot.com",
    messagingSenderId: "815567088023",
    appId: "1:815567088023:web:35ece42f8499707c5f3cd2"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
