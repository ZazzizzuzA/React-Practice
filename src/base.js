import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD3AK2OvSz7wjUOk_qCh0CbLOYJP781ckA",
  authDomain: "catch-of-the-day-zazzizzuza.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-zazzizzuza.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;