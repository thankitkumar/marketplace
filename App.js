import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/components/screens/LoginScreen';
import OnBoardingScreen from './src/components/screens/OnBoarding';
import HomeScreen from './src/components/screens/Home';
import TermsScreen from './src/components/screens/TermsScreen';
import SplashScreen from 'react-native-splash-screen';
const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          logggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          logggedIn: true,
          loaded: true,
        });
      }
    });
    // Hiding splash after Mount screen .
    //SetTimeout for splashscreen stay atleast 3 sec

    setTimeout(() => SplashScreen.hide(), 3000);
  }
  render() {
    // screen for stack & tabs
    const {logggedIn} = this.state;
    if (!logggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* Onboarding screen */}
            <Stack.Screen
              name="OnBoardingScreen"
              component={OnBoardingScreen}
              options={{headerShown: false}}
            />
            {/* Login screen */}
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            {/* TermsScreen screen */}
            <Stack.Screen
              name="TermsScreen"
              component={TermsScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return <HomeScreen />;
  }
}

export default App;
