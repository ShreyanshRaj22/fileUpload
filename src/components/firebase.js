import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAPYvgVV168S9jTfzGY6l7qpFkYlE5w0CU",
    authDomain: "fileupload-a4f1a.firebaseapp.com",
    projectId: "fileupload-a4f1a",
    storageBucket: "fileupload-a4f1a.appspot.com",
    messagingSenderId: "812817677597",
    appId: "1:812817677597:web:a706a9596b9e6fc75175f4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore, app as firebase };