import React, { useEffect, useState } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, ScrollView, Button, Dimensions } from 'react-native'
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertNewTodo, queryAllTodos } from './android/Database/Schema/Index';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddTodo = ({ navigation, route }) => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dateText, setDateText] = useState('')
    const [dateString, setDateString] = useState('')
    const [taskDetails, setTaskDetails] = useState('')
    const [getTaskDetails, setGetTaskDetails] = useState('');
    const [type, setType] = useState('work')
   
    const { username } = route.params;


    //   const saveValueFunction = () => {
    //     // Function to save the value in AsyncStorage
    //     if (taskDetails) {
    //       // To check the input not empty
    //       AsyncStorage.setItem('any_key_here', taskDetails);
    //       // Setting a data to a AsyncStorage with respect to a key
    //       setTaskDetails('');
    //       // Resetting the TextInput
    //       alert('Data Saved');
    //       // Alert to confirm
    //     } else {
    //       alert('Please fill data');
    //     }
    // }


    // const getValueFunction = () => {
    //     // Function to get the value from AsyncStorage
    //     AsyncStorage.getItem('any_key_here').then(
    //       (value) =>
    //         // AsyncStorage returns a promise
    //         // Adding a callback to get the value
    //         setGetTaskDetails(value),
    //       // Setting the value in Text
    //     );
    //   };


    const handleDateText = () => {
        setDateText('Date Entered')
    }

    // const handleSubmit = async () => {
    //     // setTaskDetails('taskDetails')
    //     console.log("Submitting todo")
    //     var todoDetails = { taskDetails: taskDetails, dateString: dateString }
    //     try {
    //         var jsonTodo = JSON.stringify(todoDetails);
    //         var tempData = await AsyncStorage.getItem("user_id");
    //         var userData;
    //         if (tempData != null)
    //             userData = JSON.parse(tempData);
    //         else
    //             userData = [];
    //         userData.push(todoDetails);
    //         await AsyncStorage.setItem("user_id", JSON.stringify(userData));
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }

    // }

    const handleWork = () => {
      setType('work')
    }

    const handlePersonal = () => {
      setType('personal')
    }

    const handleSubmit = async () => {

      if(taskDetails)
      {
      console.log("submitting todo");

      insertNewTodo({
        description: taskDetails,
        expiry: dateString,
        status: 'false',
        type: type,
        user: `${username}`,
      }).then(resp => {
        console.log(resp);
        // queryAllTodos().then(resp => console.log(resp));
      }).catch(err => {
        console.log(err)
      })
      navigation.navigate('TodoHome', {username});
      }

      else
      {
        console.log("title empty")
      }
      // var todoDetails = {taskDetails: taskDetails, dueDate: dateString}
      // try {

      //     var tempData = await AsyncStorage.getItem("user_id");
      //     var userData;
      //     if(tempData != null){
      //         userData = JSON.parse(tempData);
      //     }else{
      //         userData = [];
      //     }
      //     userData.push(todoDetails);
      //     await AsyncStorage.setItem("user_id", JSON.stringify(userData));
      //     console.log(userData);
      // } catch (error) {
      //     console.log(error);
      // }
  }

    useEffect(() => {
        setDateString(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes())
    }, [date])

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View style = {styles.container}>
                <View style={styles.welcome}>
                    <Text style={styles.text}>ADD TO DO</Text>
                </View>
                
                <View style={styles.contentContainer}>
                    <TextInput placeholder='Enter Task Details...' style={styles.input} value={taskDetails} onChangeText={(taskDetails) => {setTaskDetails(taskDetails)}}></TextInput>
                    <TouchableOpacity title="Open" onPress={() => setOpen(true)} style = {styles.dateButton}>
                        <DatePicker
                            modal
                            open={open}
                            date={date}
                            minimumDate={new Date()}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                handleDateText()
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                        <Text>Enter Date</Text>
                    </TouchableOpacity>
                    {/* {<Text style={styles.date}>{dateString}</Text>} */}
                    {dateText ? <Text style={styles.errorText}>{dateText}</Text> : null}

                    {/* <TouchableOpacity
          onPress={saveValueFunction}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            SAVE VALUE
          </Text>
        </TouchableOpacity> */}
                    {/* 
        <TouchableOpacity
          onPress={getValueFunction}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            GET VALUE
          </Text>
        </TouchableOpacity> */}

                    <Text style={styles.textStyle}>
                        {getTaskDetails}
                    </Text>

                    <View style = {{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={()=> handleWork()} style = {(type === "work")?styles.isWork:styles.notWork}>
                        <Text>Work</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>handlePersonal()} style = {(type === "personal")?styles.isPersonal:styles.notPersonal}>
                        <Text>Personal</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button2} onPress={() => { handleSubmit() }}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.item}>{taskDetails}</Text> */}
                </View>
                
                </View>
                <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('TodoHome', {username})}>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: '300' }}>Back</Text>
      </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}




const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'rgba(76,26,165,255)',
      alignSelf: 'stretch',
      height: screenHeight,
      width: screenWidth,
      justifyContent: 'center',
      alignItems: 'center'
    },

    dateButton: {
      backgroundColor: 'rgba(237,156,90,255)',
      padding: 10,
      borderRadius: 50,
      margin:10
      
    },
  
    welcome: {
      flex: 1,
      marginTop: 100,
    //   justifyContent: 'center',
      alignItems: 'center',
    //   borderWidth: 2,
    },
  
    text: {
      fontSize: 40,
      fontWeight: "bold",
      color: 'white'
    },
  
    isWork: {
      backgroundColor: 'rgba(27,146,188,255)',
      width:70,
      height: 50,
      alignItems: 'center',
      padding:15,
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10
    },
    notWork: {
      backgroundColor: 'rgba(55,174,208,255)',
      width:70,
      height: 50,
      alignItems: 'center',
      padding:15,
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
      elevation: 10,
      shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    },

    isPersonal: {
      backgroundColor: 'rgba(27,146,188,255)',width:70,
      height: 50,
      alignItems: 'center',
      paddingVertical:15,
      borderTopRightRadius:10,
      borderBottomRightRadius:10

    },
    notPersonal: {
      backgroundColor: 'rgba(55,174,208,255)',width:70,
      height: 50,
      alignItems: 'center',
      paddingVertical:15,borderTopRightRadius:10,
      borderBottomRightRadius:10,
      elevation: 10,
      shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    },

    contentContainer: {
      flex: 4,
      // borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingVertical: 20,
      overflow: 'visible',
      alignItems: 'center',
      alignSelf: 'stretch',
    //   marginLeft: 20,
    //   marginRight: 20,
      backgroundColor: 'white',
  
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
  
      backgroundColor: 'rgba(76,26,165,255)',
      borderColor: 'rgba(0,0,0,0.5)',
      borderRadius: 25,
      padding: 10,
      // borderWidth: 1,
      width: 150,
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 10,
      marginTop: 0,
      
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
      marginTop: 85,
    },
  

  button3: {

    backgroundColor: 'rgba(75,29,163,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    // padding: 10,
    // borderWidth: 2,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginBottom: 20,
    marginTop: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    right: 340,
    top: 1,
    elevation: 10,
      shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
  },

    input: {
      height: 40,
      width: 250,
      margin: 12,
      borderWidth: 2,
      padding: 10,
      color: 'black',
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

  



// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
        
//         backgroundColor: 'purple',
//         height: screenHeight,
//         width: screenWidth,
//     },

//     welcome: {
//         flex: 1,
//         // marginTop: 200,
//         borderWidth: 2,
//         //   justifyContent: 'center',
//         alignItems: 'center',
//     },

//     text: {
//         fontSize: 40,
//         fontWeight: "bold",
//         color: 'black'
//     },

//     todoContainer: {
//         borderWidth: 2,
//         // marginTop: 50,
//         flex: 1,
//         backgroundColor: 'white',
//         // height: 1000
//         // paddingBottom: 0

//     },

//     date: {
//         fontSize: 20,
//         color: 'brown'
//     },
//     // innerText: {
//     //   marginTop: 40,
//     //   fontSize: 15,
//     //   fontWeight: '700',
//     //   marginLeft: 'auto',
//     //   marginRight: 'auto'
//     // },

//     // button: {

//     //   backgroundColor: 'rgba(121,163,223,255)',
//     //   borderColor: 'rgba(0,0,0,0.5)',
//     //   borderRadius: 25,
//     //   padding: 10,
//     //   // borderWidth: 1,
//     //   width: 150,
//     //   alignItems: 'center',
//     //   marginLeft: 'auto',
//     //   marginRight: 'auto',
//     //   marginBottom: 10,
//     //   marginTop: 20,
//     // },

//     button2: {

//         backgroundColor: 'rgba(255,117,146,255)',
//         borderColor: 'rgba(0,0,0,0.5)',
//         borderRadius: 25,
//         padding: 10,
//         // borderWidth: 2,
//         width: 185,
//         alignItems: 'center',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         marginBottom: 20,
//         marginTop: 15,
//     },

//     input: {
//         height: 40,
//         width: 250,
//         margin: 12,
//         borderWidth: 2,
//         padding: 10,
//         // marginLeft: 70,
//         // marginRight: 70,
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         marginBottom: 20,
//         marginTop: 10,
//         borderRadius: 5,
//         borderColor: 'rgba(176,146,208,255)',
//         color: 'black'
//     },

// });

export default AddTodo

