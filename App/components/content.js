import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Button, FlatList, Dimensions } from 'react-native';

import EmptyConversationPage from './EmptyConversationPage';
import { useState } from 'react';
import { Python } from 'react-native';

export const Home = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [fetching, setFetching] = useState(false);
  const handleSend = async () => {
    if (message.trim() !== '' && !fetching) {
      setFetching(true);

      const newConversation = [...conversation, { author: 'user', message: message }];
      setConversation(newConversation);
      setMessage('');
      fetch(`https://61ba-103-159-214-187.ngrok-free.app/${message}`)
        .then(response => response.json())
        .then(data => {
          setConversation(prevConversation => [...prevConversation, { author: 'bot', message: data }]);
          setFetching(false);
          console.log('Generated response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (

    <View style={{ backgroundColor: '#C3C3C3', flexDirection: 'column', height: '100%', width: '100%',justifyContent:'space-between' }}>
      <View style={{ backgroundColor: '#8C8246', height: 70, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{paddingLeft:10}}><Image source={require('../assets/menu.png')} style={{ height: 30, width: 30}} /></TouchableOpacity>
        
        <TouchableOpacity><Image source={require('../assets/settings.jpg')} style={{ height: 30, width: 30,marginLeft:300}} /></TouchableOpacity>
      </View>
      
      <ScrollView style={{ backgroundColor: '#C3C3C3', marginTop: 5 }}>

        {conversation.length === 0 ? (
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../assets/hdfc_logo.jpg')} style={{width:300,height:60,alignSelf:'center',marginTop:10}}/>
            <Text style={{marginTop:200,fontWeight:700,fontSize:20}}>How can I help you today?</Text>
          </View>
        ) : (
          <View>
            <Image source={require('../assets/hdfc_logo_2.jpg')} style={{width:50,height:50,alignSelf:'center',marginTop:10}}/>
            <FlatList data={conversation} renderItem={({ item }) => <BubbleMessage author={item.author} message={item.message} />} keyExtractor={(_, index) => index.toString()} />

          </View>
        )}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
      
        <TextInput placeholder='Ask a question ...' style={{ flex: 0.95, backgroundColor: 'white', height: 50, borderRadius: 10, marginRight: 0, paddingLeft: 8 }} value={message} onChangeText={setMessage}></TextInput>
        {!message
          ? <Text style={{ backgroundColor: '#C3C3C3', borderRadius: 10, opacity: 0.5, width: 50, height: 40, fontSize: 15, padding: 1, marginLeft: 5, fontSize: 20 }}>Send</Text>
          : <TouchableOpacity onPress={handleSend}><Text style={{ backgroundColor: '#000000', borderRadius: 10, color: '#ffffff', width: 50, height: 35, fontSize: 20, marginLeft: 5, alignSelf: 'center' }}>Send</Text></TouchableOpacity>
        }
      </View>
    </View>


  );
}

const BubbleMessage = ({ author, message }) => {
  const bubbleStyle = {
    backgroundColor: author === 'user' ? '#121212' : '#FF9A63',
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: author === 'user' ? 'flex-end' : 'flex-start',
    maxWidth: '70%',padding:10,
    paddingHorizontal:20
  };

  const textStyle = {
    color: author === 'user' ? 'white' : 'black',
  };
  const labelStyle = {
    color: author === 'user' ? 'green' : 'white',
    fontWeight: 'bold',
    marginRight: 5,
  };

  return (
    <View style={bubbleStyle}>
      <Text style={labelStyle}>{author}:</Text>
      <Text style={[textStyle, { maxWidth: '100%' }]}>{message}</Text>
    </View>
  );
};

