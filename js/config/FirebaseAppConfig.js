import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCllt8NMjvLiHIavuCnb75ebsIiwNqjw30",
  authDomain: "html-css-js-pure.firebaseapp.com",
  projectId: "html-css-js-pure",
  storageBucket: "html-css-js-pure.appspot.com",
  messagingSenderId: "710557296085",
  appId: "1:710557296085:web:d8929f5b67d05ed686895c",
  measurementId: "G-2QLW1LZVNE",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };
