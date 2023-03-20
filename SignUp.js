import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function SignUp({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const ui = (
    <SafeAreaView style={styles.signUpMain}>
      <TouchableOpacity style={styles.signUpPic} onPress={selectProfilePicture}>
        {!profileImage ? (
          <MaterialCommunityIcons
            name="camera-plus"
            color="#717171"
            size={45}
          />
        ) : (
          <Image source={{uri: profileImage.uri}} style={styles.signUpImage} />
        )}
      </TouchableOpacity>

      <View style={styles.signUpView1}>
        <Icon name="user" style={styles.signUpIcon1} />
        <TextInput
          style={styles.signUpInput1}
          placeholder={'Full Name'}
          inputMode={'text'}
          onChangeText={setName}
        />
      </View>
      <View style={styles.signUpView1}>
        <Icon name="mobile" style={styles.signUpIcon1} />
        <TextInput
          style={styles.signUpInput1}
          inputMode={'numeric'}
          maxLength={10}
          placeholder={'Mobile'}
          onChangeText={setMobileNumber}
        />
      </View>
      <View style={styles.signUpView1}>
        <Icon name="lock" style={styles.signUpIcon1} />
        <TextInput
          style={styles.signUpInput1}
          secureTextEntry={true}
          placeholder={'Password'}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.signUpButton1} onPress={signUpRequest}>
        <Text style={styles.signUpText1}>Sign Up</Text>
      </Pressable>
      <Pressable style={styles.signUpButton2}>
        <Text style={styles.signUpText1} onPress={signInProcess}>
          Back to Sign In
        </Text>
      </Pressable>
    </SafeAreaView>
  );

  async function selectProfilePicture() {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      Alert.alert('Message', 'No Image');
    } else {
      const imageObject = {
        uri: result.assets[0].uri,
        name: 'profile.png',
        type: 'image/png',
      };

      setProfileImage(imageObject);
    }
  }

  function signUpRequest() {
    var form = new FormData();
    form.append('mobile', mobileNumber);
    form.append('name', name);
    form.append('password', password);
    form.append('profile_picture', profileImage);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var t = request.responseText;
        if(t == "Uploaded") {
          navigation.navigate('Sign In');
        } else {
          Alert.alert("Message",request.responseText);
        }
      }
    };

    request.open('POST', 'http://10.0.2.2/chat_pilot/signUp.php', true);
    request.send(form);
  }

  function signInProcess() {
    // Navigate to Home
    navigation.navigate('Sign In');
  }

  return ui;
}

const styles = StyleSheet.create({
  signUpDropdownText2: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  signUpTDropdown: {
    width: '40%',
  },
  signUpTDropdownText: {
    color: '#999',
    fontSize: 20,
  },
  signUpSelect: {
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: '80%',
  },
  signUpMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  signUpText1: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  signUpButton1: {
    width: '80%',
    height: 50,
    backgroundColor: '#303030',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton2: {
    width: '80%',
    height: 50,
    backgroundColor: '#01d56a',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
  },
  signUpImage: {
    borderRadius: 120,
    width: '100%',
    height: '100%',
  },
  signUpPic: {
    marginBottom: 30,
    borderRadius: 120,
    width: 120,
    height: 120,
    backgroundColor: '#ece5dd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpIcon1: {
    fontSize: 30,
    position: 'absolute',
    start: -20,
    bottom: 10,
    left: -25,
  },
  signUpInput1: {
    width: '60%',
    borderBottomWidth: 2,
    fontSize: 20,
    borderBottomColor: '#128c7e',
    textAlign: 'center',
  },
});
