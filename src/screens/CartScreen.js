/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList, ScrollView, Image } from 'react-native';
import Arrow from '../assets/icon/arrow.svg';
import Buttons from '../components/Buttons';
import QuantitySelector from '../components/QuantitySelector';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
function CartScreen(props) {
    const [quantity, setQuantity] = useState(1);
    const renderItemsSlide = ({ item }) => (
        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <ScrollView>
                <View style={[styles.s2box, { flexDirection: 'row' }]}>
                    <Image style={{ height: 52, width: 52, backgroundColor: '#fff' }} source={item.image} />
                    <Text style={[{ color: '#fff', marginLeft: 14, width: 44 }]}>{item.categories}</Text>
                    <Text style={[{ color: '#fff', marginTop: 30, marginLeft: '24%', position: 'absolute' }]}> Rs. {item.price}</Text>
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                </View>
            </ScrollView>
        </View>
    );
    return (
        <View style={{ height: '100%' }}>
            <View style={styles.header}>
                <View style= {{flexDirection: 'row' ,margin: 25 }}>
                    <TouchableOpacity onPress={() =>props.navigation.navigate('AddToCartScreen')}>
                        <Text style={{marginTop: 10}}>
                            <Arrow /></Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 24, marginHorizontal: 20 }}>Shopping Cart</Text>
                </View>
            </View>
            <View style={{ height: '75%', backgroundColor: '#222222' }}>
                <Text style={{ color: '#fff', fontWeight: '400', fontSize: 20, margin: 10 }}>Total - Rs. 1,350</Text>
                <View>
                    {props.CartItem.length > 0 ? 
                    <FlatList
                        data={props.CartItem}
                        renderItem={renderItemsSlide}
                        keyExtractor={item => item.id}
                    />:<Text> No Item In your Card</Text>
                }
                </View>
            </View>
            <View style={{ backgroundColor: '#000000', height: '100%' }}>
                <Buttons text={'CHECKOUT'} onPress={() => { }} containerStyle={{ margin: 25}} />
            </View>
        </View>
    );
}
const mapStateToProps = (state) => {
    return{
        CartItem: state
    }
}
export default connect(mapStateToProps)(withNavigation(CartScreen));
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5A200',
        width: '100%',
        height: 95,
    },
    s2box: {
        backgroundColor: '#000000',
        width: '90%',
        borderRadius: 5,
        marginLeft: 5,
        marginTop: 20,
        padding: 8,
        color: '#fff',
    },

});
