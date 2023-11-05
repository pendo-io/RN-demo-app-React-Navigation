import React, { useState,useReducer } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Platform } from "react-native";
import PendoModal from "./PendoModal";
import {PendoSDK} from 'rn-pendo-sdk';
// const PendoModal = WithPendoModal(Modal);

const CustomAlert = (props) => {

  const [androidDefaults, setAndroidDefaults] = useState({
    container: {
      backgroundColor: (props.android && props.android.container && props.android.container.backgroundColor) || '#FAFAFA',
    },
    title: {
      color: (props.android && props.android.title && props.android.title.color) || '#000000',
      fontFamily: (props.android && props.android.title && props.android.title.fontFamily) || 'initial',
      fontSize: (props.android && props.android.title && props.android.title.fontSize) || 22,
      fontWeight: (props.android && props.android.title && props.android.title.fontWeight) || 'bold',
    },
    message: {
      color: (props.android && props.android.message && props.android.message.color) || '#000000',
      fontFamily: (props.android && props.android.message && props.android.message.fontFamily) || 'initial',
      fontSize: (props.android && props.android.message && props.android.message.fontSize) || 15,
      fontWeight: (props.android && props.android.message && props.android.message.fontWeight) || 'normal',
    },
    button: {
      color: '#387ef5',
      fontFamily: 'initial',
      fontSize: 16,
      fontWeight: '500',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
    },
  });
  const AndroidButtonBox = () => {
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(1);
    const buttonProps = props.buttons && props.buttons.length > 0 ? props.buttons : [{}]

    return (
      <View style={[styles.androidButtonGroup, {
        flexDirection: "column",
        // flexDirection: buttonLayoutHorizontal === 1 ? "row" : "column",
      }]} onLayout={(e) => {
        if(e.nativeEvent.layout.height > 60)
          setButtonLayoutHorizontal(0);
      }}>
        {
          buttonProps.map((item, index) => {
              if(index > 2) return null;
              const alignSelfProperty = buttonProps.length > 2 && index === 0 && buttonLayoutHorizontal === 1 ?  'flex-start' : 'flex-end';
              let defaultButtonText = 'OK'
              if(buttonProps.length > 2){
                if(index === 0)
                  defaultButtonText = 'ASK ME LATER'
                else if(index === 1)
                  defaultButtonText = 'CANCEL';
              } else if (buttonProps.length === 2 && index === 0)
                defaultButtonText = 'CANCEL';
              return (
                <View style={[styles.androidButton, index === 0 && buttonLayoutHorizontal === 1 ? {flex: 1} : {}]}>
                  <Pressable onPress={() => {
                    props.setModalVisible()
                    // props.setModalVisible(false)

                    if(item.func && typeof(item.func) === 'function')
                      item.func();
                  }} style={[{
                    alignSelf: alignSelfProperty, 

                  }]}>
                    <View style={[styles.androidButtonInner, {backgroundColor: (item.styles && item.styles.backgroundColor) || androidDefaults.button.backgroundColor}]}>
                      <Text
                        style={{
                          color: (item.styles && item.styles.color) || androidDefaults.button.color,
                          fontFamily: (item.styles && item.styles.fontFamily) || androidDefaults.button.fontFamily,
                          fontSize: (item.styles && item.styles.fontSize) || androidDefaults.button.fontSize,
                          fontWeight: (item.styles && item.styles.fontWeight) || androidDefaults.button.fontWeight,
                          textTransform: (item.styles && item.styles.textTransform) || androidDefaults.button.textTransform,
                        }}
                      >{item.text || defaultButtonText}</Text>
                    </View>
                  </Pressable>
                </View>
              )
            })

        }
      </View>
    );
  }
  return (
    <PendoModal
        animationType="fade"
        transparent={true}
        visible
      >
        <Pressable style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} onPress={() => props.setModalVisible(false)} />
        <View style={styles.alertBox}>
        {
          Platform.OS === "ios" ? 
          null
          :
          <View style={[styles.androidAlertBox, androidDefaults.container]}>
            <Text style={[styles.androidTitle, androidDefaults.title]}>{props.title || 'Message'}</Text>
            <Text style={[styles.androidMessage, androidDefaults.message]}>{props.message || ''}</Text>
            <AndroidButtonBox />
          </View>
        }
        </View>
      </PendoModal>
  )
}

const AnotherTry = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function setmodalVisibleFunc () {
    // this.setState({visible: !this.state.visible});
    // setModalVisible(false)
    setModalVisible(!modalVisible)
  }
  console.log('#########' + modalVisible);

  return (
    <View style={styles.centeredView}>

    {modalVisible && (
       <CustomAlert 
        modalVisible = {modalVisible}
          // setModalVisible={setModalVisible}
          setModalVisible = {setmodalVisibleFunc}
          title={'Alert Title'}
          message={'This is some message'} 
          android={{
            container: {
              backgroundColor: 'yellow'
            },
            title: {
              color: 'red',
              fontFamily: 'Roboto',
              fontSize: 26,
              fontWeight: 'normal',
            },
            message: {
              color: 'blue',
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: 'regular',
            },
          }}
          buttons={[{
            text: 'no',
            key: 'no'
          },{
            text: 'Yes',
            key: 'yes',
            func: () => {console.log('Yes Pressed')},
            styles: {
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'Roboto',
              textTransform: 'none',
              backgroundColor: '#000000'
            }
          }, {
            text: 'maybe',
            key: 'maybe',
          }
        ]}
      />
      )}

      <View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.4
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidAlertBox: {
    maxWidth: 280,
    width: '100%',
    margin: 48,
    elevation: 24,
    borderRadius: 2,
  },
  androidTitle: {
    margin: 24,
  },
  androidMessage: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 24,
  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,    
  },
  androidButtonInner: {
    padding: 10,

  }
});
export default AnotherTry;