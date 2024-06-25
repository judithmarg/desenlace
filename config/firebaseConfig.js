import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.API_KEY,
  appId: Constants.expoConfig.extra.APP_ID,
  projectId: Constants.expoConfig.extra.PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence:getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);
export {auth, firestore };