/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import ImageCarousal from '../components/ImageCarousal';
import ProductHeader from '../components/ProductHeader';
import { connect } from 'react-redux';
import { books, Sony, Mobile } from '../data/Data';
const data = [...books, ...Sony, ...Mobile]
 function AddToCartScreen( props,{navigation}) {
  const renderItems = ({ item }) => (
    <View>
      {/* <Image resizeMode="cover" source={item.Brand_url}
      style={{height: 88,width: 88,margin:10}}
      /> */}
      <View style={styles.card} />
      <Text style={styles.text}>{item.categories}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <View>
      <Image resizeMode="cover" source={item.image}
        style={{ height: 88, width: 88, margin: 10 }}
      />
    </View>
  );

  return (
    <View style={{ height: '100%' }}>
      <ProductHeader navigation={props.navigation} />
      <ScrollView>
        <View style={styles.body}>
          <Text style={[styles.stext, { marginLeft: 12, marginTop: 10 }]}>Name Of The  Product</Text>
         <ImageCarousal />
          <View >
            <Text style={[styles.stext, { marginLeft: '4%' }]}>MRP:                   200</Text>
            <Text style={[styles.stext, { marginLeft: '4%' }]}>Offer Price :       400 ( You save Rs. 30 )</Text>
            <Text style={[styles.stext, { marginLeft: '4%', fontSize: 17 }]}>Delivered By Tomorrow</Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>props.navigation.navigate('ProductScreen')}
            >
              <View>
                <ScrollView>
                  <FlatList
                    data={books}
                    renderItem={renderItems}
                    keyExtractor={item => item.id}
                    horizontal={true}
                  />
                </ScrollView>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={props.addItemToCart}>
            <View style={[styles.login, { margin: 10 }]}>
              <Text>ADD TO CART</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ marginLeft: 12, color: '#fff', fontSize: 15 }}>
            Product description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const mapDispatchToProps =(dispatch)=>{
   return{
     addItemToCart: (data)=> dispatch({type: 'ADD_TO_CART', payload: data }) 
   }
}
export default connect(null,mapDispatchToProps )(AddToCartScreen);
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#222222',
    height: '100%',
    width: '100%',
  },
  stext: {
    color: '#fff',
    fontSize: 15
  },
  card: {
    height: 88,
    width: 88,
    margin: 10,
    backgroundColor: '#C4C4C4',
    borderRadius: 4,
  },
  text: {
    color: '#FFFFFF',
    marginLeft: 13,
  },
  login: {
    backgroundColor: '#F5A200',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '90%',
    height: 40,
    marginLeft: '3%',
  },
});
