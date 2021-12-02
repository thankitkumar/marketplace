import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Buttons({text,onPress,containerStyle}) {
    return (
        <View>
           <TouchableOpacity onPress ={onPress} style= {[styles.root, containerStyle]}>
               <Text>{text}</Text>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        backgroundColor: '#F5A200',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: '90%',
        height: 40,
        marginLeft: '3%',
    },
})