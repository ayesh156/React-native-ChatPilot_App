import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Home({ navigation }) {

  const [items, setItems] = useState([]);

  async function loadFriendList(text) {
    const userJSONText = await AsyncStorage.getItem('user');
    const f = new FormData();
    f.append('userJSONText', userJSONText);
    f.append('text', text);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setItems(JSON.parse(request.responseText));
      }
    };

    request.open('POST', 'http://10.0.2.2/chat_pilot/load_users.php', true);
    request.send(f);
  }
  
  function start(){
    loadFriendList("");
  }

  useEffect(start,[]);

  const ui = (
    <SafeAreaView style={styles.home}>
      <View style={styles.homeView1}>
        <TextInput placeholder='Search...' placeholderTextColor="#ccc" style={styles.homeInput1} autoCorrect={false} onChangeText={p} />
        <TouchableOpacity style={styles.searchBtn} onPress={loadFriendList}>
        <Icon name="search" size={25} style={styles.homeImage1} />
        </TouchableOpacity>
      </View>

      <FlatList data={items} renderItem={itemUI} />

      <TouchableOpacity style={styles.contactBtn} onPress={Contact} >
        <MaterialCommunityIcons name="android-messages" size={30} color="white" style={{transform: [{scaleX: -1}]}} />
      </TouchableOpacity>

    </SafeAreaView>
  );

  function p(text){
    loadFriendList(text);
  }

  function itemUI({ item }) {
    const ui = (
      <TouchableOpacity onPress={mn}>
        <View style={styles.item}>
          <Image source={{ uri: "http://10.0.2.2/chat_pilot/" + item.pic }} style={styles.itemImage} />
          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>{item.name}</Text>
            <Text style={styles.itemText2}>{item.msg}</Text>
          </View>
          <View style={styles.itemView2}>
            <Text style={styles.itemText3}>{item.time}</Text>
            <View style={styles.itemShape1}>
              <Text style={styles.itemText4}>{item.count}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  
    function mn() {
      // Navigate to Home

      const obj = {
        "id":item.id,
        "name":item.name,
        "img":"http://10.0.2.2/chat_pilot/" + item.pic
      };

      navigation.navigate("Chat",obj);

      var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
      }
    };

    request.open('GET', 'http://10.0.2.2/chat_pilot/chat_update.php?id='+item.id, true);
    request.send();

    loadFriendList("");

    }
  
    return ui;
  }  

  function Contact() {
    navigation.navigate("Contact");
  }

  return ui;
}

const styles = StyleSheet.create({
  contactBtn:{
    position:"absolute",
    right:20,
    bottom: 20,
    borderRadius: 60,
    width: 60,
    height: 60,
    backgroundColor: "#25d366",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBtn:{
    alignItems:"center",
    justifyContent:"center",
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
    paddingRight: 20,
    width: '55%',
  },
  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: "22%"
  },
  itemShape1: {
    width: 24,
    height: 24,
    backgroundColor: '#25d366',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  home: {
    flex: 1,
    alignItems: 'center',
  },
  homeText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#2b2b2b',
    fontFamily: 'BarlowBlack',
  },
  homeInput1: {
    height: 50,
    marginLeft: "5%",
    width: '90%',
    fontSize: 20,
    paddingLeft: 15,
    paddingEnd: 60,
    color: 'white'
  },
  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075e54',
    width: '100%',
  },
  homeImage1: {
    position: 'absolute',
    right: 15,
    height: 30,
    width: 30,
    color: '#eee',
  },
});