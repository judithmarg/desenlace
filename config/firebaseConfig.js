import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest2.extra.API_KEY,
  appId: Constants.manifest2.extra.APP_ID,
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();