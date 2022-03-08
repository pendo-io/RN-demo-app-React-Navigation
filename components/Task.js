import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Task(props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}/>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circle}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  item : {
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  itemLeft : {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square : {
    width: 24,
    height: 24,
    backgroundColor: '#ec2059',
    borderRadius: 5,
    marginRight: 15
  },
  itemText : {
    color: '#2f3641',
    maxWidth: '80%',
    fontSize: 15
  },
  circle : {
    width: 12,
    height: 12,
    borderColor: '#ec2059',
    borderWidth: 2,
    borderRadius: 5
  }

})