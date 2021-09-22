import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import HomeScreen from '../screens/Home'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+91',
      confirmResult: null,
      isValidNumber: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+91',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    auth().signOut();
  }

  handleValidNumber(val) {
   let pattern = new RegExp(/^[0-9\b]+$/);
    if (val.trim().length != 10 && !pattern.test(val)) {
      this.setState({
        ...this.state,
        isValidNumber: false
      });
    }
    else {
      this.setState({
        ...this.state,
        isValidNumber: true
      });
    }
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 35 }}
          onChangeText={value => this.setState({ phoneNumber: value })}
          onEndEditing={(e) => this.handleValidNumber(e.nativeEvent.text)}
          placeholder={'Enter phone number'}
          value={phoneNumber}
          ref='mobileNo'
          keyboardType="numeric"
        />
        {this.state.isValidNumber ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={{color: '#FF0000',fontSize: 14,}}>Please enter valid number</Text>
          </Animatable.View>
        }
        <Button title="Sign In" color="green" onPress={this.signIn} />
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          <HomeScreen />
        )}
      </View>
    );
  }
}