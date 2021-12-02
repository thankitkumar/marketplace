/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, FlatList, View, StyleSheet, ScrollView, TouchableOpacity, Image,SafeAreaView, SectionList } from 'react-native';
import ProductHeader from '../components/ProductHeader';
import { books, Sony, Mobile } from '../data/Data';
import {DATA} from '../data/Product'
const data = [...books, ...Sony, ...Mobile];

export default function ProductScreen({ navigation }) {
  const renderItems = ({ item }) => (
    <View>
      <Text style={styles.stext}>{item.categories}</Text>
    </View>
  );
  const renderItemsSlide = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('AddToCartScreen')}>
          <View style={[styles.s2box, { flexDirection: 'row' }]}>
            <Image style={{ height: 52, width: 52, marginLeft: 0 }} source={item.image} />
            <Text style={[{ color: '#fff', marginLeft: 14 }]}>{item.categories}</Text>
            <Text style={[{ color: '#fff', marginTop: 30, marginLeft: '36%', position: 'absolute' }]}> Rs. {item.price}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView>
    <View style={{ height: '100%' }}>
      <ProductHeader navigation={navigation} onPress={()=>navigation.navigate('HomeScreen')}/>
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <View style={styles.slide1}>
          <FlatList
            data={data}
            renderItem={renderItems}
            keyExtractor={item => item.id}
          // numColumns={3}
          />
        </View>
        <View style={styles.slide2}>
          {/* <View style={styles.s2box}> */}
          <FlatList
            data={data}
            renderItem={renderItemsSlide}
            keyExtractor={item => item.id}
          />
          {/* </View> */}
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  slide1: {
    width: '40%',
    height: '100%',
    backgroundColor: '#000000',
  },
  slide2: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222222',
  },
  stext: {
    margin: 12,
    color: '#fff',
  },
  s2box: {
    backgroundColor: '#000000',
    width: '60%',
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 20,
    padding: 8,
    color: '#fff',
  },
});
