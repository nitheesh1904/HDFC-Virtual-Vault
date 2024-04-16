import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef } from 'react-native';

import {Home} from './components/content';
import {Top} from './components/topbar'

export default function App() {
  return (
    <View>
     
      <Home />
      
    </View>

  );
}