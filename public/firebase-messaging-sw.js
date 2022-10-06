// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBmq9MYGoENUzNhYanKNV3Xyi5aR_u3oKw',
  authDomain: 'server-17acf.firebaseapp.com',
  databaseURL: 'https://server-17acf-default-rtdb.firebaseio.com',
  projectId: 'server-17acf',
  storageBucket: 'server-17acf.appspot.com',
  messagingSenderId: '23727902779',
  appId: '1:23727902779:web:36414ec4b9c2425e588c1e',
  measurementId: 'G-ZRY9B9Q7DK',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
