import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAyw27r60O6WoPTv6clwGmMsQfeYiC5fQY",
  authDomain: "clone-de18d.firebaseapp.com",
  projectId: "clone-de18d",
  storageBucket: "clone-de18d.appspot.com",
  messagingSenderId: "426967268435",
  appId: "1:426967268435:web:2ea60bc0bb9ddbcbd79aa6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }