import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import OnBoardingScreen from './src/screens/OnBoarding';
import HomeScreen from './src/screens/Home';
import TermsScreen from './src/screens/TermsScreen';
import SplashScreen from 'react-native-splash-screen';
import ProductScreen from './src/screens/ProductScreen';
import AddToCartScreen from './src/screens/AddToCartScreen';
import CartScreen from './src/screens/CartScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store/Index'
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
        <Provider store ={store}>
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
            {/* Home screen */}
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductScreen"
              component={ProductScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddToCartScreen"
              component={AddToCartScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
      );
    }
    return (
      <Provider store ={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddToCartScreen"
            component={AddToCartScreen}
            options={{headerShown: false}}
          />
           <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{headerShown: false}}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
