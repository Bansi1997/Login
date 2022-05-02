//import liraries
import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from '../components/Images';
import colors from '../components/colors';
import { AuthContext } from '../context/AuthProvider';


// create a component
const SplashScreen = ({ navigation }) => {
  const { onAuthStateChanged
  } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(callback);

  }, []);
  const callback = () => {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.splashWrapper}>
      <SafeAreaView />
      <View style={styles.logoWrapper}>
        <Image source={Images.Logo} style={styles.splashLogo} />
        <Text style={styles.logoText}>Stolen</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image source={Images.splashImage} style={styles.image} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.infoBigText}>Hello !</Text>
        <Text style={styles.infoSmallText}>
          Best place to write you stories and share your journal experience
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.touchableButtonWrapper}
          onPress={() => { navigation.navigate('Login') }}>
          <Text style={styles.ButtonText}>LOG IN</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.touchableButtonWrapper}
          onPress={() => navigation.navigate('SignUP')}>
          <Text style={styles.ButtonText}>SIGN UP</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  splashWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  splashLogo: {
    height: 40,
    width: 40,
  },
  logoText: {
    fontFamily: 'Nunito-Bold',
    color: colors.lightText,
    fontSize: 33,
    marginLeft: 10,
  },
  imageWrapper: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 335,
    height: 338,
  },
  infoWrapper: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBigText: {
    color: colors.lightText,
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  infoSmallText: {
    color: colors.lightText,
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  touchableButtonWrapper: {
    backgroundColor: colors.loginButton,
    width: 335,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  ButtonText: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    color: colors.lightText,
  },
});

//make this component available to the app
export default SplashScreen;
