import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const Mapa = ({ users}) => {

  const [locationu, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    
  }, []);
  // Filtrar usuarios con coordenadas válidas y convertir las cadenas en números
  const locationsOfInterest = users
    .filter(user => user.lat !== null && user.lon !== null && !isNaN(parseFloat(user.lat)) && !isNaN(parseFloat(user.lon)))
    .map(user => ({
      location: {
        latitude: parseFloat(user.lat),
        longitude: parseFloat(user.lon)
      }
    }));

    const latitudeuser = JSON.stringify(locationu.coords.latitude)
    const longitudeuser = JSON.stringify(locationu.coords.longitude)

  return (
    <View style={styles.container}>
      <MapView style={styles.map}  
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude:parseFloat(latitudeuser),
          longitude:parseFloat(longitudeuser),
          latitudeDelta:2,
          longitudeDelta:2,
        }}


      >
        {locationsOfInterest.map((location, index) => (
          <Marker
            key={index}
            coordinate={location.location}
          />
        ))}
      </MapView>
      <Text>{latitudeuser}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    width: '90%',
    height: '80%',
  },
});

export default Mapa;
