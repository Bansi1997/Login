//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthProvider';


// create a component
const HomeScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const callback = () => {
        navigation.navigate('Splash');
    }
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <TouchableOpacity style={{ backgroundColor: 'Pink' }} onPress={() => { logout(callback) }}>
                <Text>Logout</Text>
            </TouchableOpacity>



        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',

    },

});

//make this component available to the app
export default HomeScreen;
