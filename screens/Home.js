import React from 'react'
import { View,Text,Button } from 'react-native'
import auth from '@react-native-firebase/auth';


export default function Home() {
   const signOut = () => {
        auth().signOut();
      }
    return (
        <View>
            <Text>
                This is Home Screen.
            </Text>
            <Button title="Sign Out" color="red" onPress={signOut} />
        </View>
    )
}
