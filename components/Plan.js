import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Keyboard, Pressable, Alert, Button, Modal,TouchableWithoutFeedback
} from 'react-native';
import React, {useContext, useState} from 'react';
import Task from './Task';
import {PendoSDK} from 'rn-pendo-sdk';
import {ThemeContext } from './ThemeContext';
import PendoModal from './PendoModal';


export interface RenderModalViewProps {
    children: any;
    type?: string;
    transparent?: boolean;
    onBackPressed: () => void;
  }

  

  function empty(){
    return "";
  }

export default function Plan({route, navigation}) {
    // initial state
    const { isDarkMode, setTheme } = useContext(ThemeContext);

    const [modalVisible, setModalVisible] = useState(false);
    function _onBackPressed() {
        // if (onBackPressed) {
            setModalVisible(!modalVisible);
        //   onBackPressed();
        // }
      }

    const childrenView  = <View style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
        <Pressable 
            // onPress={() => _onBackPressed()}
            style={[styles.button, styles.buttonClose]}>
                <View>
                    <View>
                    <TouchableOpacity/>
                    </View>
                </View>
              <Text style={styles.textStyle}>do nothing</Text>
        </Pressable>

        <Button title="close modal" onPress={() => _onBackPressed()}/>
    </View>

  

    const { children, type = 'slide', transparent = true, onBackPressed, paddingTop = 30 } : RenderModalViewProps = {children: childrenView ,onBackPressed: empty};

    


    // const [isModalVisiblee, setModalVisiblee] = useState(false);

    // const toggleModal = () => {
    //     setModalVisiblee(!isModalVisiblee);
    // };


    const [task, setTask] = useState()
    const [taskItems, setTaskItems] = useState([])

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


        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>

 <PendoModal
      animationType={ type }
      transparent={ transparent }
      visible={modalVisible}
      onRequestClose={ _onBackPressed }
    > 
      <View style={styles.containerDark}>

        {children}
      </View>
    </PendoModal>

        
            <View style={styles.tasksWrapper}>
                <Text style={styles.title}>Daily tasks</Text>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {setModalVisible(true); setTheme(!isDarkMode);}}>
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
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
    containerDark: {
        flex: 1,
        backgroundColor: '#2f3641',
    },
    containerLight: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    addTasksWrapper: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#f3f3f3',
        borderRadius: 30,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
        color: '#2f3641',
    },
    addButtonWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#f3f3f3',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,

    },
    addButton: {
        fontSize: 40,
        fontWeight: '300',
        color: '#2f3641'
    },
    logout: {
        fontSize: 12,
        fontWeight: '300',
        color: '#2f3641'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
