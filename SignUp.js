import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
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
    KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const image = { uri: "https://img.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-599.jpg?w=740&t=st=1667455335~exp=1667455935~hmac=51e7b3fe7dbe411178c786668b7ad3534d158c9de92cae1f5eb93fecd868b2f3" }

const SignUp = ({ navigation }) => {


    const[email, onChangeEmail] = React.useState(null);
    // const[password, onChangePassword] = React.useState(null);
    const[emailValidError, setEmailValidError] = React.useState('');
    
    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        if(val.length === 0){
            setEmailValidError('Email address must not be empty');
        }
        else if(reg.test(val) === false){
            setEmailValidError('Enter a valid email adress');
        }
        else if(reg.test(val) === true){
            setEmailValidError('');
        }
    };
    

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.welcome}>
                    <Text style={styles.text}>TO DO APP</Text>
                </View>

                <LinearGradient
                    colors={['rgba(255,255,255, 0.9)', 'rgba(252,252,253,255)', 'rgba(79, 206, 249,0.5)']}
                    style={styles.contentContainer}
                >
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic">
                        <View style={styles.view}>
                            {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 60}}>SIGN-UP</Text> */}
                            <TextInput placeholder='Type your username...' style={styles.input}></TextInput>
                            <TextInput 
                            placeholder='Type your Email-id...' 
                            style={styles.input} 
                            onChangeText = {(value)=>{
                                onChangeEmail(value);
                                handleValidEmail(value);
                            }} value = {email}></TextInput>
                            {emailValidError ? <Text style = {styles.errorText}>{emailValidError}</Text> : null}
                            <TextInput placeholder='Type your password...' style={styles.input}></TextInput>
                            <TouchableOpacity style={styles.button}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Submit</Text>
                            </TouchableOpacity>
                            <Text style={styles.innerText}>Already have an account?</Text>
                            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </View>
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
        marginBottom:10
    },

    innerText: {
        marginTop: 40,
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 'auto',
        marginRight: 'auto'
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
        paddingBottom:80
    },

    view: {
        // borderWidth: 2,
        marginTop: 5,
        flex: 1,

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
        marginTop: 20,
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
    image: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default SignUp;