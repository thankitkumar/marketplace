/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet, View} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.body}>
      <Image
        style={{width: '100%', height: '50%'}}
        source={{
          uri: 'https://source.unsplash.com/weekly?Apple',
        }}
      />
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: '#E5E5E5',
          position: 'absolute',
          borderRadius: 30,
          left: '80%',
          top: 20,
        }}>
        <Text style={{padding: 10, fontSize: 18}}>MK</Text>
      </View>
      <View style={styles.box}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('ProductScreen')}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.card}
                  source={{
                    uri: 'https://source.unsplash.com/weekly?Shoes',
                  }}
                />
                <Text style={styles.text}>Book</Text>
              </View>
              <View>
                <Image
                  style={styles.card}
                  source={{
                    uri: 'https://source.unsplash.com/weekly?Camera',
                  }}
                />
                <Text style={styles.text}>Camera</Text>
              </View>
              <View>
                <Image
                  style={styles.card}
                  source={{
                    uri: 'https://source.unsplash.com/weekly?Phone',
                  }}
                />
                <Text style={styles.text}>Sun</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  style={styles.card}
                  source={{
                    uri: 'https://source.unsplash.com/weekly?Iphone',
                  }}
                />
                <Text style={styles.text}>Book</Text>
              </View>
              <View>
                <Image
                  style={styles.card}
                  source={{
                    uri: 'https://source.unsplash.com/weekly?Books',
                  }}
                />
                <Text style={styles.text}>Pen</Text>
              </View>
              <View>
                <Image
                  style={styles.card}
                  source={{
                    uri: 'https://source.unsplash.com/weekly?Cat',
                  }}
                />
                <Text style={styles.text}>Men</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#222222',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  box: {
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity: 4,
    position: 'absolute',
    width: 328,
    height: 268,
    left: 16,
    top: 262,
    backgroundColor: '#303030',
    borderRadius: 18,
  },
  card: {
    height: 88,
    width: 88,
    margin: 10,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  text: {
    color: '#FFFFFF',
    marginLeft: 16,
  },
});
