/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import HomeScreen from '../screens/Home';
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
    this.unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user.toJSON()});
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
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  //Fuction for signIn with Number
  signIn = () => {
    const {phoneNumber} = this.state;
    this.setState({message: 'Sending code ...'});

    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult =>
        this.setState({confirmResult, message: 'Code has been sent!'}),
      )
      .catch(error =>
        this.setState({
          message: 'Login With Phone Number Error Please Try Again',
        }),
      );
  };
  //Fuction for confirm otp
  confirmCode = () => {
    const {codeInput, confirmResult} = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({message: 'OTP Confirmed!'});
        })
        .catch(error =>
          this.setState({
            message: 'OTP Confirm Error Please Check Internet Connection',
          }),
        );
    }
  };
  //check valid number or not?
  handleValidNumber(val) {
    let pattern = new RegExp(/^[0-9\b]+$/);
    if (val.trim().length != 13 && !pattern.test(val)) {
      this.setState({
        ...this.state,
        isValidNumber: false,
      });
    } else {
      this.setState({
        ...this.state,
        isValidNumber: true,
      });
    }
  }
  //Fuction for take input number from user
  renderPhoneNumberInput() {
    const {phoneNumber} = this.state;
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lets Get Started!</Text>
        </View>
        <View style={styles.Body}>
          <Text style={styles.EnterText}>Enter your phone number</Text>
          <Text style={styles.DestraText}>
            {'Destra will send an SMS message to verify\nyour phone number.'}
          </Text>
          <View style={styles.rectangle} />
          <TextInput
            autoFocus
            style={styles.InputText}
            onChangeText={value => this.setState({phoneNumber: value})}
            onEndEditing={e => this.handleValidNumber(e.nativeEvent.text)}
            value={phoneNumber}
            keyboardType="numeric"
          />
          {this.state.isValidNumber ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.validationText}>
                {' Incorrect number!\nKindly check the number again.'}
              </Text>
            </Animatable.View>
          )}
          <Text style={styles.termsText}>
            By proceeding you agree to our
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('TermsScreen');
              }}>
              <Text style={styles.termandcondiontext}>
                terms and conditions
              </Text>
            </TouchableOpacity>
          </Text>
          <View style={{marginTop: '79%'}}>
            <TouchableOpacity
              onPress={() => {
                this.signIn();
              }}>
              <View style={styles.login}>
                <Text>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  // Fuction for error massage
  renderMessage() {
    const {message} = this.state;

    if (!message.length) {
      return null;
    }

    return (
      <Text
        style={{
          marginTop: 12,
          padding: 8,
          backgroundColor: '#F5A200',
          color: '#fff',
        }}>
        {message}
      </Text>
    );
  }
  //Fuction for take input otp from user
  renderVerificationCodeInput() {
    const {codeInput} = this.state;

    return (
      <View style={{backgroundColor: '#999999', height: '100%'}}>
        <View style={styles.OtpBody}>
          <Text style={styles.EnterOtpText}>Enter OTP</Text>
          <TextInput
            autoFocus
            style={styles.InputOtpText}
            onChangeText={value => this.setState({codeInput: value})}
            value={codeInput}
          />
          <View style={styles.Otpbtn}>
            {/* OTP  Cancel button */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <View style={styles.OtpButton}>
                <Text>CANCEL</Text>
              </View>
            </TouchableOpacity>
            {/* OTP  Submit button */}
            <TouchableOpacity
              onPress={() => {
                this.confirmCode();
              }}>
              <View style={styles.OtpButton}>
                <Text>SUBMIT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {user, confirmResult} = this.state;
    return (
      <View style={{flex: 1}}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && <HomeScreen />}
      </View>
    );
  }
}
// CSS for styling

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 88,
    backgroundColor: '#F5A200',
  },
  headerText: {
    position: 'absolute',
    width: 299,
    height: 24,
    left: '16%',
    top: 32,
    fontFamily: ' Rubik',
    fontWeight: '500',
    fontSize: 20,
  },
  Body: {
    backgroundColor: '#222222',
    width: '100%',
    height: '100%',
  },
  EnterText: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
    width: 299,
    left: '16%',
    top: 42,
  },
  DestraText: {
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#FFFFFF',
    width: 299,
    left: '16%',
    marginTop: 58,
  },
  InputText: {
    height: 50,
    marginTop: 15,
    borderColor: '#F5A200',
    borderBottomWidth: 1,
    width: 252,
    left: '16%',
    color: '#FFFFFF',
    fontFamily: 'Rubik',
    fontWeight: '400',
    fontSize: 20,
  },
  validationText: {
    color: '#EB3959',
    fontSize: 14,
    fontFamily: 'Rubik',
    fontWeight: '400',
    left: '16%',
  },
  login: {
    backgroundColor: '#F5A200',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '80%',
    height: 40,
    left: '11%',
  },
  termsText: {
    top: '35%',
    color: '#999999',
    left: '12%',
    fontSize: 12,
    fontFamily: 'Rubik',
    fontWeight: '400',
  },
  termandcondiontext: {
    top: 5,
    color: '#F5A200',
    fontSize: 14,
    fontFamily: 'Rubik',
    fontWeight: '400',
  },
  rectangle: {
    position: 'absolute',
    width: 20,
    height: 10,
    left: 22,
    backgroundColor: '#F5A200',
  },
  OtpBody: {
    position: 'absolute',
    width: 264,
    height: 235,
    left: 48,
    top: 178,
    backgroundColor: '#222222',
    borderRadius: 18,
  },
  EnterOtpText: {
    fontSize: 14,
    fontFamily: 'Rubik',
    fontWeight: '400',
    left: 24,
    top: 24,
    color: '#FFFFFF',
  },
  InputOtpText: {
    borderColor: '#F5A200',
    borderBottomWidth: 1,
    width: 116,
    left: 70,
    color: '#FFFFFF',
    top: 40,
    fontSize: 20,
    fontFamily: 'Rubik',
    fontWeight: '400',
  },
  OtpButton: {
    backgroundColor: '#F5A200',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 96,
    height: 36,
    margin: 10,
  },
  Otpbtn: {
    margin: 20,
    top: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
