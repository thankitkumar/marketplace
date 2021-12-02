/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import HomeScreen from '../screens/Home';
import Traingle from '../assets/icon/arrow.svg';
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
      show: false,
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
  //Which give OTP from firebase and send user mobile
  signIn = () => {
    const {phoneNumber} = this.state;
    this.setState({message: 'Sending OTP ...'});

    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult =>
        this.setState({confirmResult, message: 'OTP has been sent!'}),
      )
      .catch(error =>
        this.setState({
          message: 'Login With Phone Number Error Please Try Again',
        }),
      );
  };
  //Fuction for confirm otp
  // Where User Can type manualy and auto read.
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
  handleValidNumber(phoneNumber) {
    let pattern = new RegExp(/^[0-9\b]+$/);
    if (phoneNumber.trim().length < 13 && !pattern.test(phoneNumber)) {
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
  //And return Number from user and set number in setState
  renderPhoneNumberInput() {
    return (
      <View style={styles.Body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lets Get Started!</Text>
        </View>
        <Traingle style={{left: '6%'}} />
        <View style={styles.Body}>
          <Text style={styles.EnterText}>Enter your phone number</Text>
          <Text style={styles.DestraText}>
            {'Destra will send an SMS message to verify\nyour phone number.'}
          </Text>
          <View style={{flexDirection: 'row', marginLeft: '16%'}}>
            <Text style={[styles.font, {color: '#fff', top: 25}]}>+91</Text>
            <TextInput
              autoFocus
              style={[styles.InputText, styles.font]}
              onChangeText={value =>
                this.setState({phoneNumber: '+91' + value})
              }
              onEndEditing={e => this.handleValidNumber(e.nativeEvent.text)}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
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
          <View style={{marginTop: '90%', flex: 3, marginBottom: 20}}>
            <TouchableOpacity
              onPress={() => {
                this.signIn();
                this.setState({show: true});
              }}>
              <View style={styles.login}>
                <Text>LOGIN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  backgroundColor: 'transparent',
                },
              ]}
              onPress={() => {
                this.props.navigation.navigate('HomeScreen');
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#F5A200',
                }}>
                SKIP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  // Fuction for error massage
  // where if get any error by firebase then it give an error
  renderMessage() {
    const {message} = this.state;

    if (!message.length) {
      return null;
    }

    return (
      <Text
        style={{
          padding: 8,
          backgroundColor: '#F5A200',
          color: '#fff',
        }}>
        {message}
      </Text>
    );
  }
  //Fuction for take input otp from user
  // where its have text and textInput and user can type manually and auto.
  renderVerificationCodeInput() {
    const {codeInput} = this.state;

    return (
      <View>
        <View style={styles.Body}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Lets Get Started!</Text>
          </View>
          <Traingle style={{left: '6%'}} />
          <View style={styles.Body}>
            <Text style={styles.EnterText}>Enter your phone number</Text>
            <Text style={styles.DestraText}>
              {'Destra will send an SMS message to verify\nyour phone number.'}
            </Text>
            <Text style={styles.termsText}>
              By proceeding you agree to our
              <TouchableOpacity>
                <Text style={styles.termandcondiontext}>
                  terms and conditions
                </Text>
              </TouchableOpacity>
            </Text>
            <View style={{marginTop: '90%', flex: 3, marginBottom: 20}}>
              <TouchableOpacity>
                <View style={styles.login}>
                  <Text>LOGIN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'transparent',
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#F5A200',
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          transparent={true}
          visible={this.state.show}
          animationType="fade">
          <View style={{height: '100%', backgroundColor: '#000000aa'}}>
            <View style={styles.OtpBody}>
              <Text style={styles.EnterOtpText}>Enter OTP</Text>
              <TextInput
                autoFocus
                style={[styles.InputOtpText, styles.font]}
                onChangeText={value => this.setState({codeInput: value})}
                value={codeInput}
              />
              <View style={styles.Otpbtn}>
                {/* OTP  Cancel button */}
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('OnBoardingScreen');
                    this.setState({show: false});
                  }}>
                  <View
                    style={[
                      styles.OtpButton,
                      {
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: '#F5A200',
                      },
                    ]}>
                    <Text style={{color: '#F5A200'}}>CANCEL</Text>
                  </View>
                </TouchableOpacity>
                {/* OTP  Submit button */}
                <TouchableOpacity
                  onPress={() => {
                    this.confirmCode();
                  }}>
                  <View style={styles.OtpButton}>
                    <Text style={{color: '#fff'}}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  //render all logic in page .
  render() {
    const {user, confirmResult} = this.state;
    return (
      <View style={{flex: 1}}>
        {/* first if user not login and also not give any OTP then show renderPhoneNumberInput fuction  */}
        {!user && !confirmResult && this.renderPhoneNumberInput()}
        {/* then take OTP then renderVerificationCodeInput fuction  */}
        {!user && confirmResult && this.renderVerificationCodeInput()}
        {user && <HomeScreen />}
      </View>
    );
  }
}
// CSS for styling

const styles = StyleSheet.create({
  font: {
    color: '#FFFFFF',
    fontFamily: 'Rubik',
    fontWeight: '400',
    fontSize: 20,
  },
  header: {
    width: '100%',
    height: 88,
    backgroundColor: '#F5A200',
  },
  headerText: {
    marginLeft: '16%',
    top: 32,
    fontFamily: ' Rubik',
    fontWeight: '500',
    fontSize: 20,
  },
  Body: {
    backgroundColor: '#222222',
    flex: 1,
  },
  EnterText: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
    width: 299,
    marginLeft: '16%',
    top: 42,
  },
  DestraText: {
    fontFamily: 'Rubik',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#FFFFFF',
    width: 299,
    marginLeft: '16%',
    marginTop: 58,
  },
  InputText: {
    height: 50,
    marginTop: 15,
    borderColor: '#F5A200',
    borderBottomWidth: 1,
    width: 135,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  validationText: {
    color: '#EB3959',
    fontSize: 14,
    fontFamily: 'Rubik',
    fontWeight: '400',
    marginLeft: '16%',
    marginTop: '3%',
  },
  login: {
    backgroundColor: '#F5A200',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 20,
    width: '80%',
    height: 40,
    marginLeft: '11%',
  },
  termsText: {
    top: '50%',
    color: '#999999',
    textAlign: 'center',
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
    marginLeft: 3,
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
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5A200',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
