import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Task from './Task';
import { PendoSDK } from 'rn-pendo-sdk';

export default function Plan({ route, navigation }) {

  const [task, setTask] = useState()
  const [taskItems,setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const handleTaskCompleted = (index) => {
    let newTaskItems = [...taskItems]
    newTaskItems.splice(index, 1)
    setTaskItems(newTaskItems)
  }

  const logout = () => {
    PendoSDK.endSession()
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>Daily tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => handleTaskCompleted(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
                  
              )
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.addTasksWrapper}>
          <TouchableOpacity onPress={() => logout()}>
            <View style={styles.addButtonWrapper}>
              <Text style={styles.logout}>Logout</Text>
            </View>
        </TouchableOpacity>
        <TextInput
            style={styles.input}
            onChangeText={text => setTask(text)}
            value={task}
            placeholder="Add a task here!"
          />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addButtonWrapper}>
            <Text style={styles.addButton}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3641',
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  title: {
    color: '#ec2059',
    fontSize: 25,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  addTasksWrapper : {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input : {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 30,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    color: '#2f3641',
  },
  addButtonWrapper : {
    width: 60,
    height: 60,
    backgroundColor: '#f3f3f3',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    
  },
  addButton : {
    fontSize: 40,
    fontWeight: '300',
    color: '#2f3641'
  },
  logout: {
    fontSize: 12,
    fontWeight: '300',
    color: '#2f3641'
  }
});
