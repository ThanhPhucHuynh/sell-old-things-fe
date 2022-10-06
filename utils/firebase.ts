import { getMessaging, getToken } from 'firebase/messaging';
import * as firebase from 'firebase/app';
import localforage from 'localforage';

export const FCM_TOKEN = 'fcm_token';
export const YOUR_WEB_PUSH_CERTIFICATE_KEY_PAIR =
  'BMUsF9FMcuZ-ahTe0Ne4X0VWjsmZDAhFZ70KQb5tfUO0hbFlMCO4-0e4Xlz_XngFwN6SUVfqFbb8NH1WqE0xEco';

export const CONFIG = {
  apiKey: 'AIzaSyBmq9MYGoENUzNhYanKNV3Xyi5aR_u3oKw',
  authDomain: 'server-17acf.firebaseapp.com',
  databaseURL: 'https://server-17acf-default-rtdb.firebaseio.com',
  projectId: 'server-17acf',
  storageBucket: 'server-17acf.appspot.com',
  messagingSenderId: '23727902779',
  appId: '1:23727902779:web:36414ec4b9c2425e588c1e',
  measurementId: 'G-ZRY9B9Q7DK',
};
export const ops: firebase.FirebaseOptions = {
  apiKey: CONFIG.apiKey,
  authDomain: CONFIG.authDomain,
  projectId: CONFIG.projectId,
  storageBucket: CONFIG.storageBucket,
  messagingSenderId: CONFIG.messagingSenderId,
  appId: CONFIG.appId,
};

class FirebaseCloudMessaging {
  app: firebase.FirebaseApp;

  constructor() {
    this.app = firebase.initializeApp(ops);
  }

  static async init(app: firebase.FirebaseApp) {
    try {
      const mgs = getMessaging(app);
      const token = await localforage.getItem(FCM_TOKEN);

      if (token !== null) {
        return token;
      }

      const status = await Notification.requestPermission();
      if (status && status === 'granted') {
        const fcmToken = await getToken(mgs, {
          vapidKey: YOUR_WEB_PUSH_CERTIFICATE_KEY_PAIR,
        });
        if (fcmToken) {
          localforage.setItem(FCM_TOKEN, fcmToken);
          return fcmToken;
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
    return null;
  }
}

export default FirebaseCloudMessaging;
