import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCteMVhd9tAnceuZyZQQhN37EIlxmYO-DQ",
    authDomain: "my-collection-806ee.firebaseapp.com",
    databaseURL: "https://my-collection-806ee.firebaseio.com",
    projectId: "my-collection-806ee",
    storageBucket: "my-collection-806ee.appspot.com",
    messagingSenderId: "43722310839",
    appId: "1:43722310839:web:eec1fc65cfa3710367b932"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();