import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInputProps,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
const phoneImage = require("../../assets/PhoneImage.png");
import { RootStackParamList } from "../../props/Props";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {sendSmsVerification} from "../../api/verify";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "allow"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function PhoneNumber({ navigation }: Props) {
  interface Phone extends TextInputProps {
    number: string;
  }

  const textInput = useRef<TextInput>(null);
  const [phoneVerfication, setPhoneVerfication] = useState<Phone | null>(null);
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [country, setCountry] = useState<Country | null>(null);
  const [disabled, setDisabled] = useState(true);
  const onChangeTextInput = (textNum: string) => {
    setPhoneVerfication({ number: textNum });

    if (phoneVerfication?.number && phoneVerfication?.number !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onPressContinue = () => {
    if (phoneVerfication?.number) {
      const formatedPhone = `+${[country?.callingCode]}${
        phoneVerfication?.number
      }`;
      sendSmsVerification(formatedPhone).then(() => {
        navigation.navigate("Auth", { phoneNumber: formatedPhone });
      });
      setDisabled(true);
    }
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.Container}>
        <Image style={styles.PhoneImage} source={phoneImage} />
        <Text style={styles.MainText}>{`Enter your Phone Number`}</Text>
        <Text style={styles.SecondaryText}>
          {`Hamba will send you a text with a verification code.`}
        </Text>

        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={"padding"}
          style={styles.AvoidingView}
        >
          <Text
            style={styles.TextTitle}
          >{`Please input your mobile number`}</Text>
          <View
            style={[
              styles.ContainerInput,
              {
                borderBottomColor: phoneVerfication?.number
                  ? "#054BAC"
                  : "gray",
              },
            ]}
          >
            <View style={styles.OpenDialogView}>
              <CountryPicker
                {...{
                  countryCode,
                  onSelect,
                }}
              />
              <Text>{`| `}</Text>
            </View>
            <TextInput
              ref={textInput}
              style={styles.PhoneNumStyle}
              placeholder="921 271 011"
              keyboardType="numeric"
              value={phoneVerfication?.number}
              onChangeText={onChangeTextInput}
              secureTextEntry={false}
            />
          </View>

          <View style={styles.ViewBotton}>
            <TouchableOpacity disabled={disabled} onPress={onPressContinue}>
              <View
                style={[
                  styles.btnContinue,
                  {
                    backgroundColor:
                      phoneVerfication?.number && !disabled
                        ? "#054BAC"
                        : "gray",
                  },
                ]}
              >
                <Text style={styles.TextContinue}>{`Continue`}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    top: "15%",
  },
  PhoneImage: {
    width: 125,
    height: 125,
    alignSelf: "center",
  },
  MainText: {
    color: "#054BAC",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 22.5,
    marginTop: 15,
  },
  SecondaryText: {
    color: "#070707",
    fontWeight: "400",
    alignSelf: "center",
    fontSize: 15,
    maxWidth: "70%",
    textAlign: "center",
    marginTop: 10,
  },
  PhoneNumStyle: {
    marginLeft: 5,
    height: 50,
    flex: 1,
  },
  AvoidingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  TextTitle: {
    marginVertical: 50,
    fontSize: 15,
  },
  ContainerInput: {
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1.2,
  },
  OpenDialogView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ViewBotton: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  TextContinue: {
    color: "#fff",
    alignItems: "center",
  },
});
