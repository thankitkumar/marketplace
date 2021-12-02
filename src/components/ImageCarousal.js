import React from 'react'
import { View, Image, FlatList, StyleSheet, useWindowDimensions } from 'react-native'
import { books } from '../data/Data';

export default function ImageCarousal() {
    const windowWidth = useWindowDimensions().width;
    const renderItems = ({ item }) => (
        <View>
            <Image style={[styles.img, { width: windowWidth - 40 }]} source={item.image} />
        </View>
    );
    return (
        <View>
            <FlatList
                data={books}
                renderItem={renderItems}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={windowWidth - 20}
                snapToAlignment={'center'}
                decelerationRate={'fast'}

            />
            <View style={styles.dots}>
                {books.map((image,id) => (
                    <View style={styles.dot} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 328,
        margin: 10,
        borderRadius: 1,
        resizeMode: 'contain'
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center'

    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: '#000000',
        margin: 5,
        borderWidth: 1,
        borderColor: '#F5A200'

    }
})