import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenHeight } from 'react-native-elements/dist/helpers';




const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function TodoHome({ navigation }) {

  // const { dateString } = route.params;
  // const { taskDetails } = route.params;
  const [getTaskDetails, setGetTaskDetails] = useState('');
  const [todoList, setTodoList] = useState();


  useEffect(() => {
    getItems();
  }, [todoList]);

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


  const getItems = async () => {
    try {
      const todoListJSON = await AsyncStorage.getItem("user_id");
      setTodoList(JSON.parse(todoListJSON))

      // AsyncStorage.getItem('user_id').then((value) => setTodoList(value));
      console.log(todoList)

    }
    catch (error) {
      console.log(error)
    }
  };



  // var initialElements = ['1234','1234235'];
  // const [exampleState, setExampleState] = useState(initialElements);

  // const addElement = () => {
  //     var newArray = [...initialElements , dateString];
  //     setExampleState(newArray);
  //   }

  //   useEffect(() => {
  //     var newArray = [...initialElements , {dateString}];
  //     setExampleState(newArray);
  //   },[dateString])


  return (
    <View  style={styles.container}>
      {/* <ScrollView stickyHeaderIndices={[1]}> */}
        <View  style={styles.container}>
          <View style={styles.welcome}>
            <Text style={styles.text}>TO DO APP</Text>
          </View>
          <View style={styles.contentContainer}>
            {/* <View style={styles.view}>
                <TextInput placeholder='Type your username...' style={styles.input}></TextInput>
                <TextInput placeholder='Type your password...' style={styles.input}></TextInput>
              </View> */}

            {/* {<Text style={styles.date}>{dateString}</Text>} */}
            {/* 

                <FlatList
        data={[
          {key: dateString}
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/> */}

            {/* <FlatList
            keyExtractor={item => item.dateString}
            data={exampleState}
            renderItem={({item}) =>  <Text style={styles.item}>{dateString}</Text>}/>  */}
            {/* <Text style={styles.item}>{dateString}</Text> */}
            {/* <Text style={styles.item}>{taskDetails}</Text> */}

            {/* <Button
          title="Add element"
          onPress={addElement} /> */}
            {/* <TouchableOpacity
          onPress={getValueFunction}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            GET VALUE
          </Text>
        </TouchableOpacity> */}

            <TouchableOpacity
              onPress={getItems}
              style={styles.button}>
              <Text>
                GET ITEMS
              </Text>
            </TouchableOpacity>


            <FlatList data={todoList} renderItem={({ item }) => {
              return <Text>{item.taskDetails}</Text>
            }} />

            {/* 
        // <FlatList data = {getTaskDetails} renderItem = {({item}) => {
        //     return <Text>{item.taskDetails}</Text>
        // }} /> */}

          </View>
          <View style={styles.links}>
            <Text style={{ width: 300, height: 60, color: 'black', marginLeft: 250, marginTop: 35 , fontWeight: 'bold'}}> TODO</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('AddTodo')}>
              <Text style={{ fontSize: 100, margin: -33 }}>+</Text>
            </TouchableOpacity>
      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(76,26,165,255)',
    // alignSelf: 'stretch',
    height: screenHeight,
    width: screenWidth,
    // justifyContent: 'center',
    alignItems: 'center'
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
    color: 'black'
  },

  links: {
    position: 'absolute',
    // borderWidth:2,
    top: 230,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 250,
  },

  contentContainer: {
    flex: 3,
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
    backgroundColor: 'rgba(238,238,242,255)',

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
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginBottom: 10,
    marginTop: 20,
    
  },

  button2: {

    backgroundColor: 'rgba(75,29,163,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    // padding: 10,
    // borderWidth: 2,
    width: 80,
    height: 80,
    alignItems: 'center',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginBottom: 20,
    marginTop: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    right: 35,
    top: 650
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

export default TodoHome