import * as React from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { useState, useEffect } from 'react';
const axios = require('axios').default;
import * as Location from 'expo-location'
import { LinearGradient } from 'expo-linear-gradient'


import Loading from './Loading';
import Weather from './Weather';

export default function App() {
  const [location, setLocation] = useState(null);
  const [isloadingLocation, setIsloadingLocation] = useState(true);
  const [isLoadingWeather, setIsloadingWeather] = useState(true)
  const [weather, setWeather] = useState(null)

  const ApiKey = '55472b15b23a8f1224080f26ddc14242'

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({ accuracy: 1000 })
      setLocation(location);
      setIsloadingLocation(false)
    } catch (error) {
      Alert.alert('Не можу визначити місцезнаходження!', 'Переконайтеся, що дали доступ до місцезнаходження вашого пристрою')
    }
  }

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&lang=ua&units=metric`);
    const weatherData = {
      temp: data.main.temp,
      condition: data.weather[0],
      city: data.name
    }

    setWeather(weatherData);
    setIsloadingWeather(false)
  }


  useEffect(async () => {
    getLocation()
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      getWeather(latitude, longitude);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {isloadingLocation || isLoadingWeather ? <Loading /> : <Weather weather={weather} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
