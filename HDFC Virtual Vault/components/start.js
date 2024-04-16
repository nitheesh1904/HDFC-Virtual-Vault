import { Text, View, StyleSheet, Image } from 'react-native';

export const  Start=()=> {
  return (
    <View style={{alignItems:'center',justifyContent:'center',alignContent:'center'}} >
      <Image source={require('../assets/icon.jpeg')}/>
    </View>
  );
}
