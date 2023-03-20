import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Chat({route, navigation}) {
  const [chatText, setChatText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  async function sendRequest() {
    const form = new FormData();
    var userJsonText = await AsyncStorage.getItem('user');
    var userJsObject = JSON.parse(userJsonText);
    form.append('id1', userJsObject.id);
    form.append('id2', route.params.id);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArray = JSON.parse(responseText);
        setChatHistory(responseArray);
      }
    };

    request.open('POST', 'http://10.0.2.2/chat_pilot/load_chat.php', true);
    request.send(form);
  }

  async function saveChat() {
    var userJsonText = await AsyncStorage.getItem('user');
    var fromUserObject = JSON.parse(userJsonText);

    var requestObject = {
      from_user_id: fromUserObject.id,
      to_user_id: route.params.id,
      message: chatText,
    };

    const form = new FormData();
    form.append('requestJSON', JSON.stringify(requestObject));

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setChatText('');
      }
    };

    request.open('POST', 'http://10.0.2.2/chat_pilot/save_chat.php', true);
    request.send(form);
  }

  const ui = (
    <ImageBackground
      style={styles.chat}
      resizeMode="cover"
      source={require('./images/chatbg.png')}>
      <FlatList
        data={chatHistory}
        renderItem={chatItem}
        style={styles.chatList}
      />

      <View style={styles.container}>
        <View style={styles.chatSendView}>
          <FontAwesome5 name="laugh-beam" size={24} color="grey" />
          <TextInput
            style={styles.chatInput1}
            autoCorrect={false}
            placeholder="Enter your message"
            onChangeText={text => setChatText(text)}
            value={chatText}
          />
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        </View>
        <Pressable style={styles.buttonContainer}>
          {!chatText ? (
            <MaterialCommunityIcons name="microphone" color="white" size={28} />
          ) : (
            <MaterialIcons name="send" color="white" size={28} onPress={saveChat} />
          )}
        </Pressable>
      </View>
    </ImageBackground>
  );

  function start() {
    setInterval(sendRequest, 1000);
  }

  useEffect(start, []);

  return ui;
}

function chatItem({item}) {
  const itemUI = (
    <View
      style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
      <Text style={styles.chatText3}>{item.msg}</Text>
      <View style={styles.chatView1}>
        <Text style={styles.chatText4}>{item.time}</Text>
        {item.side == 'right' ? (
          <Icon
            name="check"
            size={14}
            style={
              item.status == 'seen' ? styles.chatIconSeen : styles.chatIconSent
            }
          />
        ) : null}
      </View>
    </View>
  );
  return itemUI;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  chatSendView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  chatInput1: {
    flex: 1,
    marginHorizontal: 10,
    padding: 0,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: '#0C6157',
    borderRadius: 25,
    width: 50,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: 50,
  },
  item: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
  },
  itemText1: {
    color: '#303030',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText2: {
    color: '#6F6F6F',
    fontSize: 16,
  },
  itemText3: {
    color: '#6F6F6F',
    fontSize: 14,
    marginBottom: 5,
  },
  itemText4: {
    color: 'white',
    fontSize: 14,
  },
  itemView1: {
    paddingLeft: 20,
    justifyContent: 'center',
    paddingRight: 30,
    width: '60%',
  },
  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemShape1: {
    width: 24,
    height: 24,
    backgroundColor: '#0d5eff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIcon1: {
    paddingHorizontal: 15,
    color: 'green',
    fontSize: 24,
  },
  chatText4: {
    fontSize: 10,
    color: '#626262',
  },
  chatText3: {
    color: 'black',
  },
  chatIconSeen: {
    paddingLeft: 10,
    color: 'blue',
  },
  chatIconSent: {
    paddingLeft: 10,
    color: '#828282',
  },
  chatList: {
    width: '100%',
    paddingVertical: 10,
  },
  chatViewLeft: {
    backgroundColor: '#c1e8ff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginRight: 50,
    marginVertical: 5,
  },
  chatViewRight: {
    backgroundColor: '#dcf8c5',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginLeft: 60,
    marginRight: 10,
    marginVertical: 5,
  },
  chatView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chat: {
    flex: 1,
    alignItems: 'center',
  },
  chatText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#2b2b2b',
    fontFamily: 'BarlowBlack',
  },
  chatText2: {
    fontSize: 22,
    color: '#303030',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});
