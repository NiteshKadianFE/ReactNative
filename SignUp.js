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
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
    Touchable,
    Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { useTogglePasswordVisibility } from './android/hooks/useTogglePasswordVisibility';
// import { useTogglePasswordVisibility } from './hooks/useTogglePasswordVisibility';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const image = { uri: "https://img.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-599.jpg?w=740&t=st=1667455335~exp=1667455935~hmac=51e7b3fe7dbe411178c786668b7ad3534d158c9de92cae1f5eb93fecd868b2f3" }

const SignUp = ({ navigation }) => {


    const [email, onChangeEmail] = React.useState(null);
    const [emailValidError, setEmailValidError] = React.useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [password, onChangePassword] = useState(null);
    const [submitMessage, setSubmitMessage] = React.useState('');
    const [username, onChangeUsername] = useState(null);
    const [passwordValidError, setPasswordValidError] = React.useState('');
    const [eyeImage, setEyeImage] = useState('https://cdn-icons-png.flaticon.com/512/159/159078.png')
    const [eyeBool, setEyeBool] = useState(true);

    const handleSubmit = async (val) => {
        if (!emailValidError && password.length > 8)
            setSubmitMessage('Signed Up Successfully');
        if (emailValidError)
            setSubmitMessage(' ');
        if (password.length < 8)
            setPasswordValidError('Password should be more than 8 characters')
        // navigation.navigate('Login')



        var signupDetails = { password: password, username: username }
        try {
            // var jsonTodo = JSON.stringify(todoDetails);
            var tempData = await AsyncStorage.getItem("login_id");
            var userData;
            if (tempData != null)
                loginData = JSON.parse(tempData);
            else
                loginData = [];
            loginData.push(signupDetails);
            await AsyncStorage.setItem("login_id", JSON.stringify(loginData));
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (val.length === 0) {
            setEmailValidError('Email address must not be empty');
        }
        else if (reg.test(val) === false) {
            setEmailValidError('Enter a valid email adress');
        }
        else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };

    const handlePasswordVisibility = val => {
        if (passwordVisibility) {
            setPasswordVisibility(false);
        }
        if (!passwordVisibility) {
            setPasswordVisibility(true);
        }
    }

    const handleEyeImage = () => {
        if (eyeBool === true) {
            setEyeImage('https://cdn-icons-png.flaticon.com/512/159/159078.png');
            setEyeBool(false);
            setPasswordVisibility(false);
        }
        else {
            setEyeImage('https://toppng.com/uploads/preview/eye-closed-icon-11550225620ajweggaqlk.png')
            setEyeBool(true);
            setPasswordVisibility(true);
        }
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.welcome}>
                        <Text style={styles.text}>TO DO APP</Text>
                    </View>

                    <LinearGradient
                        colors={['rgba(255,255,255, 0.9)', 'rgba(252,252,253,255)', 'rgba(79, 206, 249,0.5)']}
                        style={styles.contentContainer}
                    >
                        <View>
                            <View style={styles.view}>
                                {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 60}}>SIGN-UP</Text> */}
                                <TextInput placeholder='Type your username...' style={styles.input} value={username}
                                    onChangeText={(value) => {
                                        onChangeUsername(value);
                                        // handleValidEmail(value);
                                    }}></TextInput>
                                <TextInput
                                    placeholder='Type your Email-id...'
                                    style={styles.input}
                                    onChangeText={(value) => {
                                        onChangeEmail(value);
                                        handleValidEmail(value);
                                    }} value={email}></TextInput>
                                {emailValidError ? <Text style={styles.errorText}>{emailValidError}</Text> : null}


                                <View style={styles.passView}>
                                    <TextInput placeholder='Type your password...' style={styles.passInput} textContentType="newPassword" secureTextEntry={passwordVisibility}
                                        onChangeText={(value) => {
                                            onChangePassword(value);
                                            // handleValidPassword(value);
                                        }} value={password}>
                                    </TextInput>
                                    <TouchableOpacity onPress={handleEyeImage}>
                                        {eyeBool? <Image style={styles.buttonImage} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/159/159078.png' }} /> : <Image style={styles.buttonImage} source={{ uri: 'https://toppng.com/uploads/preview/eye-closed-icon-11550225620ajweggaqlk.png' }} />}
                                    </TouchableOpacity>
                                </View>

                                {passwordValidError ? <Text style = {styles.errorText}>{passwordValidError}</Text> : null}

                                <View>

                                    <TouchableOpacity style={styles.button} onPress={(value) => { handleSubmit(value) }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Submit</Text>
                                    </TouchableOpacity>
                                    {submitMessage ? <Text style={styles.submitText}>{submitMessage}</Text> : null}

                                    <Text style={styles.innerText}>Already have an account?</Text>
                                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Login</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
                </View>
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

    errorText: {
        color: 'rgba(255, 99, 71, 255)',
        // marginTop: 20,
        // marginBottom: 10,
        marginLeft:43
        // flex: 1

    },

    innerText: {
        marginTop: 40,
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    submitText: {
        marginTop: 0,
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        color: 'gray'
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
        paddingBottom: 350
    },

    view: {
        // borderWidth: 2,
        marginTop: 5,
        flex: 1,

    },

    passView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 30,
        marginBottom: 60
        // marginRight: 'auto'
    },

    button: {

        backgroundColor: 'rgba(255,117,146,255)',
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        padding: 10,
        // borderWidth: 2,
        width: 150,
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        marginTop: 80,
    },

    button2: {

        backgroundColor: 'rgba(121,163,223,255)',
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        padding: 10,
        // borderWidth: 2,
        width: 185,
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
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
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 5,
        borderColor: 'rgba(176,146,208,255)',
    },
    passInput: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        // marginLeft: 70,
        // marginRight: 70,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        marginBottom: 10,
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

    buttonImage: {
        height: 30,
        width: 30,
        // borderWidth:2,
        // borderColor: 'black',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 15
    },

});

export default SignUp;
