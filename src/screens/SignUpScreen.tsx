//import liraries
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../components/colors';
import Images from '../components/Images';
// import {WriteDataInDatabase, CheckData} from '../database/Firebase';
import { AuthContext } from '../context/AuthProvider';
import Entypo from 'react-native-vector-icons/Entypo';

// create a component
const SignUP = ({ navigation }) => {
  const [isShowPassword, setIsShowPassword] = useState(false); //usestate for password showing or not
  const [Username, setUsername] = useState(''); //Username
  const [Password, setPassword] = useState(''); //Password
  const [Email, setEmail] = useState(''); //Email
  const passwordShowIcon = isShowPassword ? 'eye' : 'eye-with-line';  // set icon based on password show condition
  const {
    usernameError,
    setUsernameError,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    register,
  } = useContext(AuthContext);
  const validator = require('validator');

  //callback from authProvider
  const callback = () => {
    setEmailError('');
    setPasswordError('');
    setUsernameError('');
    navigation.navigate('Login');
  };
  //validate and then register in database
  const validate = () => {
    if (Username == '' || Email == '' || Password == '') {
      Username == '' && setUsernameError('    Enter Username');
      (Email == '') ? setEmailError('    Enter Email') : (!validator.isEmail(Email)) && setEmailError('   Enter valid Email');
      Password == '' && setPasswordError('    Enter Password');
    } else {
      !validator.isEmail(Email)
        ? setEmailError('   Enter valid Email')
        : register(Username, Email, Password, callback);
    }
  };

  return (
    <View style={styles.mainWrapper}>
      <SafeAreaView />
      {/* Back */}
      <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(),
              setUsernameError(''),
              setEmailError(''),
              setPasswordError('');
          }}>
          <Ionicons name="chevron-back" size={30} color={colors.lightText} />
        </TouchableOpacity>
      </View>
      {/* Welcome to Stolen */}
      <View style={styles.headerWrapper}>
        <Text style={styles.headerBigTextWrapper}>Welcome to Stolen</Text>
        <Text style={styles.headerSmallTextWrapper}>
          your best place to save memorize
        </Text>
      </View>
      {/* Get Login Data */}
      <View style={styles.signUpDetailWrapper}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.signUpDetailText}>Username</Text>
          <Text style={{ ...styles.signUpDetailText, color: 'red' }}>
            {usernameError}
          </Text>
        </View>
        <TextInput
          value={Username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          style={styles.signUpDetailTextInput}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.signUpDetailText}>Email</Text>
          <Text style={{ ...styles.signUpDetailText, color: 'red' }}>
            {emailError}
          </Text>
        </View>
        <TextInput
          value={Email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          style={styles.signUpDetailTextInput}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.signUpDetailText}>Password</Text>
          <Text style={{ ...styles.signUpDetailText, color: 'red' }}>
            {passwordError}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            value={Password}
            onChangeText={setPassword}
            style={{ ...styles.signUpDetailTextInput, flex: 1 }}
            secureTextEntry={!isShowPassword}
            autoCapitalize={'none'}
          />
          <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', right: 10, top: 10 }} onPress={() => { setIsShowPassword(!isShowPassword) }}>
            <Entypo name={passwordShowIcon} size={20} style={{ alignSelf: 'flex-end' }}></Entypo>
          </TouchableOpacity>
        </View>
      </View>
      {/* SingUP Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.touchableSignupButtonWrapper}
          onPress={() => {
            setUsernameError(''), setEmailError(''), setPasswordError('');
            validate();
          }}>
          <Text style={styles.SignupButtonText}>SIGN UP</Text>
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
        <View style={styles.logInWrapper}>
          <Text style={styles.messageText}>You have account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
              setUsernameError(''), setEmailError(''), setPasswordError('');
            }}>
            <Text style={styles.logInText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  mainWrapper: {
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
  headerBigTextWrapper: {
    color: colors.lightText,
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
  },
  headerSmallTextWrapper: {
    color: colors.lightText,
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
  },
  signUpDetailWrapper: {
    marginHorizontal: 20,
    marginTop: 42,
  },
  signUpDetailText: {
    color: colors.lightText,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  signUpDetailTextInput: {
    backgroundColor: colors.input,
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: colors.blackText,
    paddingHorizontal: 10,
  },

  buttonWrapper: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  touchableSignupButtonWrapper: {
    backgroundColor: colors.loginButton,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 36,
  },
  SignupButtonText: {
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
  logInWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logInText: {
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
export default SignUP;
