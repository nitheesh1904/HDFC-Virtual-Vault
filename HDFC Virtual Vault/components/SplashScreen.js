import { View, Text } from 'react-native'
import React from 'react'

const SplashScreen = () => {
    return (
        <View >
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'black' }}>

                <Text style={{fontSize:50}}>SplashScreen</Text>
            </View>

        </View>
    )
}

export default SplashScreen