import React, { Component } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './auth/LoginScreen';
import OnBoardingScreen from './screens/OnBoarding'
import HomeScreen from './screens/Home'
import Splash from './images/Splash.svg'
const Stack = createStackNavigator();
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    logggedIn: false,
                    loaded: true
                })
            } else {
                this.setState({
                    logggedIn: true,
                    loaded: true
                })
            }
        })
    }
    render() {
        const { loaded, logggedIn } = this.state;
        if (!loaded) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Splash/>
                </View>
            )
        }
        if (!logggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }
        return (
            <HomeScreen />
        )
    }

}

export default App;