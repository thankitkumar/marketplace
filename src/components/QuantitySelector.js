/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function QuantitySelector({ quantity, setQuantity }) {
  const onMinus = () => {
    setQuantity(Math.max(0,quantity - 1));
  };
  const onPlus = () => {
    setQuantity(quantity + 1);
  };
  return (
    <View style={styles.root}>
      <Pressable onPress={onMinus} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable onPress={onPlus} style={[{
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14, height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5A200',
      }]}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginLeft: 100,
    marginTop: 22
  },
  button: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5A200',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14

  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  quantity: {
    height: 25,
    color: '#fff',
    width: 40,
    textAlign: 'center',
    backgroundColor: '#222222'
  }

})
