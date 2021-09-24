import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Home() {
  const signOut = () => {
    auth().signOut();
  };
  return <Button title="Sign Out" color="red" onPress={signOut} />;
}
