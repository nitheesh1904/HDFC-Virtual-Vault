import {View,Text,StyleSheet,ScrollView,Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Button, FlatList} from 'react-native';



export const Top=()=>{

return(<View style={{flexDirection:'row',height:60,backgroundColor:'gray',paddingTop:30,paddingLeft:10}}>
<TouchableOpacity><Image source={require('../assets/menu.png')} style={{height:30,width:30}} /></TouchableOpacity>
</View>)
};