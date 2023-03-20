import React, { Component } from 'react';
import {View,TouchableOpacity} from "react-native";
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Home } from './Home';
import { Contact } from './Contact';
import { Chat } from './Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet,Image, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator();

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
}

render() {
    return (
      
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#075e54",
                shadowOpacity: 0,
                elevation: 0,
            },
            headerTintColor: "white",
            }}>
            <Stack.Screen name='Sign In' options={{ title: '', headerStyle:{backgroundColor:'white'} }} component={SignIn} />
            <Stack.Screen name='Sign Up' options={{ title: '', headerStyle:{backgroundColor:'white'}}} component={SignUp} />
            <Stack.Screen name='Home' options={({ navigation }) => ({
                title: "ChatPilot",
                headerLeft: null,
                headerRight: () => (
                <TouchableOpacity style={{right: 15, flexDirection:"row"}} onPress={() => {
                  navigation.navigate('Sign In')

                  async function clearAsyncStorage() {
                  await AsyncStorage.clear();
                  }
                  clearAsyncStorage();
                  
                  }}>
                    <Icon name="power-off" size={22} color="#fff" />
                </TouchableOpacity>
                )
                })} component={Home} />
                <Stack.Screen name='Contact' options={{
                title: "Select contact",
                headerRight: () => (
                <View style={{right: 15, flexDirection:"row"}}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#fff" />
                </View>
                )
                }} component={Contact} />
            <Stack.Screen name='Chat' component={Chat}  options={({route}) => ({
              headerTitle: () => (
                <View style={styles.chatHeaderLeft}>
                  <Image source={{uri :route.params.img}} style={styles.avatar} />
                  <Text style={styles.headerUsername}>{route.params.name}</Text>
                </View>
              ),
              headerRight: () => (
                <View style={styles.chatHeaderRight}>
                  <Icon name="video" size={22} color={'white'} />
                  <MaterialIcons name="call" size={22} color={'white'} />
                  <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
                </View>
              )
            })} />
        </Stack.Navigator>
    </NavigationContainer>
    );

  }

}

const styles = StyleSheet.create({
    headerRight: {
      flexDirection: 'row',
      width: 60,
      justifyContent: 'space-between',
    },
    headerUsername:{
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
    },
    chatHeaderLeft: {
      flexDirection: 'row',
      marginLeft: -20
    },
    chatHeaderRight: {
      flexDirection: 'row',
      width: 100,
      marginRight: 15,
      justifyContent: 'space-between',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 50,
      marginRight: 15,
  },
  });