import { StyleSheet, Text, View, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useState } from 'react';
import styled from 'styled-components/native'
const axios = require('axios').default;

export default function Weather({ weather }) {
   const key = '27080999-60926cc9aa625999d53976853';
   const { temp, city, condition: { description, main } } = weather;
   const [image, setImage] = useState('');
   let icon;
   let gradient;
   switch (main) {
      case 'Clear':
         icon = 'weather-sunny';
         gradient = ['#ef8e38', '#108dc7']
         break
      case 'Thunderstorm':
         icon = 'weather-lightning',
            gradient = ['#780206', '#061161']
         break
      case 'Drizzle':
         icon = 'weather-hail'
         gradient = ['#000428', '#004e92']
         break
      case 'Rain':
         icon = 'weather-pouring'
         gradient = ['#2b5876', '#4e4376']
         break
      case 'Snow':
         icon = 'weather-snowy-heavy'
         gradient = ['#2C3E50', '#4CA1AF']
         break
      case 'Clouds':
         icon = 'weather-cloudy'
         gradient = ['#bdc3c7', '#2c3e50']
         break
      default:
         icon = ''
   }


   useEffect(async () => {
      try {
         const { data } = await axios.get(`https://pixabay.com/api/?key=${key}&q=${main}&image_type=photo&pretty=true`)
         const randomPhoto = getRandomArbitrary(0, data.hits.length);
         console.log(data.hits[randomPhoto])
         setImage(data.hits[randomPhoto].largeImageURL)
      } catch (error) {
         console.log(error)
      }
   }, [])

   function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }
   function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
   }

   return (
      <LinearGradient colors={gradient} style={styles.container}>
         <StatusBar barStyle='light-content' backgroundColor={gradient[0]} />
         <View style={styles.box}>
            <Text style={styles.location}>{city}</Text>
            <MaterialCommunityIcons name={icon} size={96} color='white' />
            <Text style={styles.temp}>{Math.round(temp)}°</Text>
            <Text style={styles.text}>{capitalizeFirstLetter(description)}</Text>
         </View>
         <View style={styles.box}>
            {image ?
               <StyledImage source={{ uri: image }} /> :
               <ActivityIndicator size="large" color="white" />
            }
         </View>
      </LinearGradient>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   temp: {
      fontSize: 42,
      textAlign: 'center',
      color: 'white'
   },
   location: {
      fontWeight: '600',
      fontSize: 42,
      marginBottom: 20,
      color: 'white'
   },
   text: {
      color: 'white',
      fontSize: 20
   },
   box: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
})
const dimensions = Dimensions.get('screen');
const imageHeight = dimensions.height / 2 - 50 ;
const imageWidth = dimensions.width - 50;

const StyledImage = styled.Image`
   width: ${imageWidth};
   height: ${imageHeight};
   border-radius: 20;
`