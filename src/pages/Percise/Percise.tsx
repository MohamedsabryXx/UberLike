import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../props/Props';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'welcome'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function Percise({navigation}: Props) {
  const onClick = () => {
    navigation.navigate('PhoneNumber');
  };

  return (
    <View style={styles.PerciseContainer}>
      <View style={styles.LocationContainer}>
        <FontAwesomeIcon
          style={styles.LocationPin}
          size={50}
          icon={faLocationDot}
        />
      </View>
      <Text style={styles.TextPercise}>Enable precise location</Text>
      <Text style={styles.TextSecondary}>
        Your location will be used to show people near you.
      </Text>
      <TouchableOpacity onPress={onClick} style={styles.BtnEnable}>
        <Text style={styles.BtnText}>Enable</Text>
      </TouchableOpacity>

      <Text style={styles.TextPlaceholder}>
        🔒 Magicaly secured text to make all security concerns go away.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  PerciseContainer: {
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    top: '20%',
  },
  LocationContainer: {
    backgroundColor: '#E5E5E5',
    borderRadius: 5000,
    width: 50,
    height: 50,
    padding: 50,
    alignSelf: 'center',
  },
  LocationPin: {
    position: 'relative',
    transform: [{translateX: -25}, {translateY: -25}],
    color: '#fff',
  },
  TextPercise: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 35,
    marginTop: 10,
  },
  TextSecondary: {
    textAlign: 'center',
    fontSize: 15,
    maxWidth: '60%',
    alignSelf: 'center',
    marginTop: 10,
  },
  BtnEnable: {
    backgroundColor: '#054BAC',
    paddingVertical: 10,
    width: 200,
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 30,
  },
  BtnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 25,
  },
  TextPlaceholder: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 14,
    maxWidth: 250,
    alignSelf: 'center',
    marginTop: 180,
  },
});
