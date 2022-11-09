import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { deleteAllTodos, queryAllTodos, updateTodo } from './android/Database/Schema/Index';
import { Image } from 'react-native-elements';




const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function TodoHome({ navigation, route }) {

  const { username } = route.params;
  // const { taskDetails } = route.params;
  const [page, setPage] = useState('pending');
  const [getTaskDetails, setGetTaskDetails] = useState('');
  const [todoList, setTodoList] = useState();
  const [doneList, setDoneList] = useState();
  // const [status, setStatus] = useState(true);

  useEffect(() => {
    handleList();
  }, []);

  // var todoListJSON
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
  const handlePending = () => {
    setPage('pending')
  }

  const handleDone = () => {
    setPage('done')
  }

  const handleStatus = async (todo) => {
    await updateTodo(todo);
    handleList();
  }

  const handleLogout = async() => {
    await AsyncStorage.removeItem("userDetails")
    navigation.navigate('Login')
  }

  const handleList = async () => {
    try {
      // console.log("aaaaaaaaaaa")
      // const todoListJSON = await AsyncStorage.getItem("user_id");
      // setTodoList(JSON.parse(todoListJSON))
      //await queryAllTodos();
      const todoListJSON = await queryAllTodos();
      // setTodoList(todoListJSON);
      setTodoList(todoListJSON.filtered("status=='false'").filtered(`user=="${username}"`))
      setDoneList(todoListJSON.filtered("status=='true'").filtered(`user=="${username}"`))
      // console.log(todoList)

      // AsyncStorage.getItem('user_id').then((value) => setTodoList(value));
      // console.log(todoList)
    }
    catch (error) {
      console.log(error)
    }
  };

  const deleteItems = async () => {
    await deleteAllTodos();
    handleList();
  }

  const renderItem = ({item}) => (
    <Item todo = {item}></Item>
  )

  const Item = ({ todo }) => {
    return (
      <View style={styles.listItems}>
        <Image style={styles.buttonImage} source={todo.type === "work" ? { uri: 'https://www.nicepng.com/png/detail/205-2053714_font-work-comments-work-experience-icon-for-resume.png' } : { uri: 'https://www.clipartmax.com/png/middle/440-4405730_contact-us-personal-icon-png.png' }}></Image>
        <Text style={styles.listDes}>{todo.description}</Text>
        <Text style={styles.listExp}>{todo.expiry}</Text>
        <TouchableOpacity onPress={() => {handleStatus(todo);}}>
          <Text style = {{color: 'black', paddingRight:10, color: 'rgba(75,29,163,255)'}}>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <ScrollView stickyHeaderIndices={[1]}> */}
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.text}>TO DO APP</Text>
        <Text style={styles.hello}>Hello, {username}</Text>
        </View>
        <View style={styles.contentContainer}>
{/*          

          <TouchableOpacity
            onPress={handleList}
            style={styles.button}>
            <Text>
              GET ITEMS
            </Text>
          </TouchableOpacity> */}

          {/* 
            <FlatList data={todoList} style = {styles.flatList} renderItem={({ item }) => {
              return <Text style = {styles.listItems}>{item.description}               {item.expiry}</Text>
            }} /> */}


          <FlatList data={page === "pending" ? todoList : doneList} renderItem={renderItem} />


          {/* <TouchableOpacity
            onPress={deleteItems}
            style={styles.button}>
            <Text>
              Delete All Tasks
            </Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.button}>
            <Text style = {styles.hello}>
              Logout
            </Text>
          </TouchableOpacity>

        </View>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => handlePending()}>
            <Text style={page === "pending" ? styles.pending : styles.notPending}> PENDING</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDone()}>
            <Text style={page === "done" ? styles.done : styles.notDone}> DONE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('AddTodo', {username})}>
        <Text style={{ fontSize: 100, margin: -33, color: 'white', fontWeight: '100' }}>+</Text>
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
    marginTop: 50,
    //   justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50
    //   borderWidth: 2,
  },
  flatList: {
    // alignContent: 'center',
    // justifyContent: 'center'
    // alignItems: 'center'
  },

  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 20
  },

  hello: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white'
  },

  pending: { width: 100, height: 60, right: 1, top: 15, fontWeight: 'bold', fontSize: 20, flex: 1, color: 'rrgba(76,26,165,255)ed' },

  notPending: { width: 100, height: 60, right: 1, top: 15, fontWeight: 'bold', fontSize: 20, flex: 1 },


  done: { width: 80, height: 60, right: 1, top: 15, fontWeight: 'bold', fontSize: 20, flex: 1, color: 'rgba(76,26,165,255)' },

  notDone: { width: 80, height: 60, right: 1, top: 15, fontWeight: 'bold', fontSize: 20, flex: 1 },


  links: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    // borderWidth:2,
    top: 185,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    // alignItems: 'center',
    // height: 85,
    width: 280,
  },

  listDes: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black'
  },

  listExp: {
    flex: 1,
    color: 'black'

  },

  contentContainer: {
    flex: 5,
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

  listItems: {
    backgroundColor: 'white',
    margin: 5,
    fontSize: 18,
    borderRadius: 8,
    height: 100,
    width: 350,
    color: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 35,
    borderLeftWidth: 4,
    borderLeftColor: 'rgba(76,26,165,255)',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1,
    flexDirection: 'row'

  },

  innerText: {
    marginTop: 40,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  button: {

    backgroundColor: 'rgba(75,29,163,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    // borderWidth: 1,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 'auto',
    marginRight: 180,
    marginBottom: 0,
    marginTop: 30,

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
    top: 700
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

  buttonImage: {
    height: 30,
    width: 33,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 15,
    marginLeft: 15
  },

});

export default TodoHome