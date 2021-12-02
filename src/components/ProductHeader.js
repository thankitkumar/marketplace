/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native';
import Card from '../assets/icon/cart.svg';
import Arrow from '../assets/icon/arrow.svg';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'

function ProductHeader(props) {
    return (

        <View style={[styles.header]}>
            <View style={{ flexDirection: 'row', margin: 18 }}>
                <TouchableOpacity onPress={() =>props.navigation.navigate('ProductScreen')}>
                    <Text style={{ marginTop: 10 }}>
                        <Arrow /></Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="black"
                    placeholder="Search in Brand A" />
                <TouchableOpacity onPress={() => props.navigation.navigate('CartScreen')}>
                    <View style={{ padding: 5, marginLeft: 8 }}>
                        <View style={{ marginLeft: 12, position: 'absolute', height: 20, width: 20, borderRadius: 15, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                            <Text style={{ color: '#fff' }}>{props.CartItem.length}</Text>
                        </View>
                        <Card style={{ marginTop: 8 }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const mapStateToProps = (state) => {
    return{
        CartItem: state
    }
}
export default connect(mapStateToProps)(withNavigation(ProductHeader));

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5A200',
        width: '100%',
        height: 95,
    },
    input: {
        borderWidth: 3,
        width: 255,
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#fff',
        marginLeft: 17,
        borderRadius: 5,
    },

});
