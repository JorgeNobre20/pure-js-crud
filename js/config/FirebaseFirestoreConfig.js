import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  getDoc,
  doc,
  where,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import { firebaseApp } from "./FirebaseAppConfig.js";

const firestoreDatabase = getFirestore(firebaseApp);

export {
  firestoreDatabase,
  addDoc,
  getDocs,
  getDoc,
  collection,
  query,
  doc,
  where,
  deleteDoc,
  updateDoc,
};
