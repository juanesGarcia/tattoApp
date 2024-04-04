import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getUsersWithRating } from "./auth.js";
import Mapa from "./Mapa.jsx";
import Search from "./Search.jsx";
import * as Location from 'expo-location';

const Home = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const showData = async () => {
      try {
        const response = await getUsersWithRating();
        const parsedUsers = parseUserData(response);
        setUsers(parsedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    if (users.length === 0) {
      showData();
    }
  }, [users]);

  const parseUserData = (data) => {
    return data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        rol: item.rol,
        lon: item.lon,
        lat: item.lat,
        city: item.city,
        average_rating: parseFloat(item.average_rating).toFixed(1) || 0,
        avatar: item.avatar,
        rating_count: item.rating_count,
      };
    });
  };

  return (
    
      <View style={{ flex: 1,backgroundColor:'pink'}}>
        <Search></Search>
        <View id="dd" style={{flex:1}}>
          <Mapa style={{ flex: 1 }} users={users}></Mapa>
        </View>
      </View>
    
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
