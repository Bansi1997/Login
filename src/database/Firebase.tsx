//import * as firebase from 'firebase/app';
import * as firebase from 'firebase/app';
import { getDatabase, ref, child, set, get } from 'firebase/database';
import { useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyA7f7HtBuKVWj27ne1TcuyodAD9pNlZIQE',
  authDomain: 'reactnativefirebase-9f9ec.firebaseapp.com',
  projectId: 'reactnativefirebase-9f9ec',
  storageBucket: 'reactnativefirebase-9f9ec.appspot.com',
  messagingSenderId: '976423702375',
  appId: '1:976423702375:web:e5fe01c7970b047dece9c2',
  measurementId: 'G-SZRPJX99C8',
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
//export const database = 'hello'; //getDatabase(app);

//..............SignUP.......................
export const WriteDataInDatabase = (Username: string, Password: string) => {
  const db = getDatabase();
  set(ref(db, 'users/' + Username), {
    username: Username,
    password: Password,
  });
};
export const CheckData = (Username: string) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${Username}`))
    .then(snapshot => {
      // const [isFound, setIsFound] = useState(true);
      if (snapshot.exists()) {
        Username === snapshot.val().username ? true : false;
      } else {
        console.log('No data available');
      }

      return isFound;
    })
    .catch(error => {
      console.error(error);
    });
};

// .....................LoginIn....................
export const ReadDataFromDatabase = (Username: string, Password: string) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${Username}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        Username === snapshot.val().username &&
          Password === snapshot.val().password
          ? alert('Login Successfull!')
          : alert('Please Enter valid Username & Password!');
        console.log(snapshot.val().username);
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
};
