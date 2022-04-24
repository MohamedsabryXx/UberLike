import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../props/Props';
import {checkVerification} from '../../api/verify';
const unVerifed = require('../../assets/unVerifed.png');
const verifedImg = require('../../assets/verifed.png');
const errVerifed = require('../../assets/errVerifed.png');
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenNavigationProp;
};

export default function Auth({navigation, route}: Props) {
  const [verifed, setVerifed] = useState<boolean>(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [checking, setChecking] = useState(false);

  const {phoneNumber} = route.params;
  const [logged, setLogged] = useState(false);

  const storeData = async (success: boolean) => {
    try {
      await AsyncStorage.setItem('@user_reg', JSON.stringify(logged));
      console.log('Logged from func', logged);
      console.log('Success', success);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if (verifed) {
      setLogged(verifed);
      storeData(verifed);
      console.log('logged from useEffect', logged);
    }
  }, [logged, verifed]);

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <Image
          source={
            verifed && !invalidCode
              ? verifedImg
              : invalidCode
              ? errVerifed
              : unVerifed
          }
          style={styles.Img}
        />
        <Text style={styles.prompt}>Enter Verification Code</Text>
        <Text style={styles.message}>
          {` Enter the 6 digit code that we have sent to ${phoneNumber}`}
        </Text>
        <Button
          title="Edit Phone Number"
          onPress={() => navigation.replace('PhoneNumber')}
        />
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setChecking(true);
            checkVerification(phoneNumber, code).then((success: boolean) => {
              !success ? setInvalidCode(true) : setInvalidCode(false);

              if (success) {
                setVerifed(success);
                setChecking(false);
              }
            });
          }}
        />
        <TouchableOpacity
          disabled={checking}
          onPress={() => {
            verifed && navigation.replace('Root');
          }}>
          <View
            style={[
              styles.btnContinue,
              {
                backgroundColor: verifed && !checking ? '#054BAC' : 'gray',
              },
            ]}>
            <Text style={styles.TextContinue}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Img: {
    width: 125,
    height: 125,
    alignSelf: 'center',
    marginBottom: 15,
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    color: 'black',
    fontSize: 20,
    borderRadius: 5,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
    fontWeight: '800',
    color: '#054BAC',
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextContinue: {
    color: '#fff',
    alignItems: 'center',
  },
});
