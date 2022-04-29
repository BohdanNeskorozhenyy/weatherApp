import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

export default function Loading() {

   return (
      <LinearGradient colors={['#2b5876', '#4e4376']} style={styles.container}>
         <ActivityIndicator size="large" color='white'/>
      </LinearGradient >
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   
   },
})

