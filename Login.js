import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button, Font,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NetworkInfo } from 'react-native-network-info';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const image = { uri: "https://img.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-599.jpg?w=740&t=st=1667455335~exp=1667455935~hmac=51e7b3fe7dbe411178c786668b7ad3534d158c9de92cae1f5eb93fecd868b2f3" }

const Login = ({ navigation }) => {

  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');


  const handleSubmit = async () => {
    // NetworkInfo.getIPAddress().then(ipAddress => {
    //   console.log(ipAddress);
    // });
    console.log('fff')
    await fetch(
      `http://192.168.191.147:8082/login?username=spider&password=kadian`,

      {
        method: 'POST',
      },
    )
      .then(res => {
        console.log(res.status, 'res.staus', typeof res.status);
        if (res.status === 200) {
          flag = true;
          console.log("matched")
          navigation.navigate('TodoHome')
        }
        // else
        //   console.log('did not match')
      })
      .catch(e => console.log(e));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.welcome}>
            <Text style={styles.text}>TO DO APP</Text>
          </View>

          <LinearGradient
            colors={['rgba(255,255,255, 0.95)', 'rgba(252,252,253,0.8)', 'rgba(79, 206, 249,0.1)']}
            style={styles.contentContainer}
          >

            <View style={styles.view}>
              <TextInput placeholder='Type your username...' style={styles.input} onChangeText={(value) => {
                onChangeUsername(value);
              }} value={username}></TextInput>
              <TextInput placeholder='Type your password...' style={styles.input} onChangeText={(value) => {
                onChangePassword(value);
              }} value={password}></TextInput>
              <TouchableOpacity style={styles.button} onPress={() => { handleSubmit() }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.innerText}>Don't have an account?</Text>
              <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  welcome: {
    flex: 1,
    marginTop: 200
  },

  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: 'black'
  },

  contentContainer: {
    flex: 2,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: 'visible',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,

  },

  view: {
    // borderWidth: 2,
    marginTop: 5,
    flex: 1,

  },

  innerText: {
    marginTop: 40,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  button: {

    backgroundColor: 'rgba(121,163,223,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    // borderWidth: 1,
    width: 150,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 20,
  },

  button2: {

    backgroundColor: 'rgba(255,117,146,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    // borderWidth: 2,
    width: 185,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 15,
  },

  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    // marginLeft: 70,
    // marginRight: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    borderColor: 'rgba(176,146,208,255)',
  },

  image: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Login;
