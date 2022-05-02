import React, { createContext, useState } from 'react';
import auth, { getAuth, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider, sendPasswordResetEmail } from '@react-native-firebase/auth';
import * as firebase from 'firebase/app';
import { getDatabase, ref, child, set, get } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from '@babel/core';



export const AuthContext = createContext({});

const firebaseConfig = {
  apiKey: 'AIzaSyA7f7HtBuKVWj27ne1TcuyodAD9pNlZIQE',
  authDomain: 'reactnativefirebase-9f9ec.firebaseapp.com',
  projectId: 'reactnativefirebase-9f9ec',
  storageBucket: 'reactnativefirebase-9f9ec.appspot.com',
  messagingSenderId: '976423702375',
  appId: '1:976423702375:web:e5fe01c7970b047dece9c2',
  measurementId: 'G-SZRPJX99C8',
};
const app = firebase.initializeApp(firebaseConfig);



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        usernameError,
        setUsernameError,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError,
        login: async (email: string, password: string, callback: any) => {
          try {
            await auth().signInWithEmailAndPassword(email, password).then((res) => {
              callback();


            });

          } catch (error) {
            error.code === 'auth/user-not-found' && setEmailError('  user not Found');
            error.code === 'auth/wrong-password' && setPasswordError('   Wrong Password');
            error.code === 'auth/network-request-failed' && alert('Network Failed '), console.log('network Failed');
            error.code === 'auth/too-many-requests' && alert('try another Password');
            console.log(error);
          }
        },
        register: async (username: string, email: string, password: string, callback: any) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then((res) => {
                callback();
                //implement extra data in realtime database
                const db = getDatabase();
                set(ref(db, 'users/' + username), {
                  user: username,
                });
              });
          } catch (error) {
            error.code === 'auth/weak-password' &&
              setPasswordError('  Too weak password');
            error.code === 'auth/email-already-in-use' &&
              setEmailError('  Email Already Available');
            console.log(error);
          }
          //return false;
        },
        rememberUser: async (email: string, password: string) => {  //remembr me 
          try {
            const user = { Email: email, Password: password };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            // const value = await AsyncStorage.getItem('user')
            // console.log("data_stored......" + value);

          } catch (e) {
            console.log(e);
          }
        },
        getrememberUser: async (remembrCallback: any) => {
          try {
            const value = await AsyncStorage.getItem('user')
            console.log("data_stored......" + value);
            if (value != null)
              remembrCallback(JSON.parse(value).Email, JSON.parse(value).Password);
          } catch (e) {
            console.log(e);
          }
        },
        sendPasswordReset: async (email: any) => { // Reset the password
          try {
            await auth().sendPasswordResetEmail(email);
            alert("Password reset link sent!");
          } catch (err) {
            console.error(err);
            alert(err.message);
          }
        },
        onAuthStateChanged: async (callback: any) => { //automatic logged after the login
          try {
            await auth().onAuthStateChanged((user) => {
              setUser(user);

              user == null ? null : callback();
            });
          } catch (error) {
            console.log(error);
          }
        }
        ,
        logout: async (callback: any) => {
          try {
            await auth().signOut();
            callback();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider >
  );
};
