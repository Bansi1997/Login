//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import colors from '../components/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Images from '../components/Images';
// import {ReadDataFromDatabase} from '../database/Firebase';
import { AuthContext } from '../context/AuthProvider';
import Entypo from 'react-native-vector-icons/Entypo';


// create a component
const LoginScreen = ({ navigation }) => {
  const [isRemember, setIsRemember] = useState(false); //usestate for checked or unchecked Remember me
  const [isShowPassword, setIsShowPassword] = useState(false); //usestate for password showing or not
  const [Email, setEmail] = useState(''); //Email
  const [Password, setPassword] = useState(''); //Password
  const { user, emailError, setEmailError, passwordError, setPasswordError, login, sendPasswordReset, rememberUser, getrememberUser } = useContext(AuthContext);    // use context
  const IsRemamberIcon = isRemember ? 'checkbox-active' : 'checkbox-passive'; //Remember-me CheckBox
  const passwordShowIcon = isShowPassword ? 'eye' : 'eye-with-line';  // set icon based on password show condition
  const validator = require('validator');


  //callback from AuthProvider
  const callback = () => {
    if (isRemember) {
      rememberUser(Email, Password); //remember the user 
    }
    navigation.navigate('Home');
  }
  useEffect(() => {
    getrememberUser(rememberCallback);    //call from Authprovider
  }, []);
  //Fill the textInput by previus data
  const rememberCallback = (email: string, password: string) => {

    setEmail(email);
    setPassword(password);

  }
  //validate the email and then login
  const validate = () => {

    if (Email === '' || Password == '') {
      Password === '' && setPasswordError('     Enter Password');
      (Email === '') ? setEmailError('    Enter E-mail') : !validator.isEmail(Email) && setEmailError('   Enter valid Email');
    }
    else {
      !validator.isEmail(Email) ? setEmailError('   Enter valid Email') : login(Email, Password, callback);
    }
  };

  return (
    <View style={styles.LoginWarpper}>
      <SafeAreaView />
      {/* Back */}
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(), setEmailError(''), setPasswordError('');
          }}>
          <Ionicons name="chevron-back" size={30} color={colors.lightText} />
        </TouchableOpacity>
      </View>
      {/* Welcome Back */}
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTextWrapper}>Welcome back</Text>
      </View>
      {/* Get Login Data */}
      <View style={styles.loginDetailWrapper}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.loginDetailText}>Email</Text>
          <Text style={{ ...styles.loginDetailText, color: 'red' }}>
            {emailError}
          </Text>
        </View>
        <TextInput
          value={Email}
          onChangeText={setEmail}
          style={styles.loginDetailTextInput}
          autoCapitalize={'none'}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.loginDetailText}>Password</Text>
          <Text style={{ ...styles.loginDetailText, color: 'red' }}>
            {passwordError}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            value={Password}
            onChangeText={setPassword}
            style={{ ...styles.loginDetailTextInput, flex: 1 }}
            secureTextEntry={!isShowPassword}
            autoCapitalize={'none'}
          />
          <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', right: 10, top: 10 }} onPress={() => { setIsShowPassword(!isShowPassword) }}>
            <Entypo name={passwordShowIcon} size={20} style={{ alignSelf: 'flex-end' }}></Entypo>
          </TouchableOpacity>
        </View>

        <View style={styles.loginWrapper}>
          <View style={styles.remembermeTextWrapper}>
            <TouchableOpacity onPress={() => setIsRemember(!isRemember)}>
              <Fontisto name={IsRemamberIcon} size={20} color={colors.lightText} />
            </TouchableOpacity>

            <Text style={styles.remembermeText}> Remember me</Text>
          </View>
          <TouchableOpacity onPress={() => { sendPasswordReset(Email) }}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Login Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.touchableLoginButtonWrapper}
          onPress={() => {
            setEmailError(''), setPasswordError(''), validate();
          }}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <TouchableOpacity style={styles.touchableGoogleButtonWrapper}>
          <View style={styles.googleButtonWrapper}>
            <Image source={Images.googleImage} style={styles.googleImage} />
            <Text style={styles.google_FacebookButtonText}>
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableFaceBookButtonWrapper}>
          <View style={styles.googleButtonWrapper}>
            <Image source={Images.facebookImage} style={styles.faceBookImage} />
            <Text style={styles.google_FacebookButtonText}>
              Continue with Facebook
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.signupWrapper}>
          <Text style={styles.messageText}>Don’t have account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUP'), setEmailError(''), setEmail('');
              setPassword(''), setPasswordError('');
            }}>
            <Text style={styles.signUPText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
};

// define your styles
const styles = StyleSheet.create({
  LoginWarpper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButtonWrapper: {
    marginHorizontal: 20,
    marginVertical: 20,
  },

  headerWrapper: {
    marginHorizontal: 20,
  },
  headerTextWrapper: {
    color: colors.lightText,
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
  },
  loginDetailWrapper: {
    marginHorizontal: 20,
    marginTop: 42,
  },
  loginDetailText: {
    color: colors.lightText,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  loginDetailTextInput: {
    backgroundColor: colors.input,
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: colors.blackText,
    paddingHorizontal: 10,
  },
  loginWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  remembermeText: {
    color: colors.lightText,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    marginLeft: 10,
  },
  forgotPasswordText: {
    color: colors.darkText,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  remembermeTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  touchableLoginButtonWrapper: {
    backgroundColor: colors.loginButton,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 36,
  },
  loginButtonText: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    color: colors.lightText,
  },
  orText: {
    color: colors.lightText,
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 20,
  },
  touchableGoogleButtonWrapper: {
    backgroundColor: colors.googleButton,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 36,
  },
  google_FacebookButtonText: {
    color: colors.blackText,
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    marginLeft: 10,
  },
  googleButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleImage: {
    height: 18,
    width: 18,
  },
  touchableFaceBookButtonWrapper: {
    backgroundColor: colors.googleButton,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 36,
    marginVertical: 10,
  },
  faceBookImage: {
    height: 22,
    width: 22,
  },
  signupWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUPText: {
    color: colors.darkText,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  messageText: {
    color: colors.lightText,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
});

//make this component available to the app
export default LoginScreen;
