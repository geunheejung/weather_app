import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

export default function App() {
  const [ city, setCity ] = useState('Loading...');
  const [ location, setLocation ] = useState(null);
  const [ ok, setOk ] = useState(true);

  const ask = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) setOk(false);

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const [{ city }] = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });

    setCity(city);
  } 

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>      
      <ScrollView 
        contentContainerStyle={styles.weather} 
        horizontal // 가로로 스크롤링되게 해줌.
        showsHorizontalScrollIndicator={false}
        // indicatorStyle='white'
        pagingEnabled // ture일 경우, 스크로링이 중간에 멈추지 않고 완전히 넘어가게함.
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>      
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1, 
    backgroundColor: 'tomato'
  },
  city: {
    flex: 1.2,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
    fontWeight: '500'
  },
  weather: {
    // ScrollView의 사이즈가 정해지면, 아이템을 기준으로 가변적으로 변해야하는데, 사이즈가 고정된다?
    // ScrollView에는 Flex Size를 줄 필요가 없다. -> 이 ScrollView는 스크린보다 커야한다. 
    // 즉, ScrollView는 스크린 사이즈와 무관하게 아이템 크기만큼 늘어나야하는데, 사이즈를 지정하면 한정된다. 
    // 우리는 스크린을 넘겨서 스크롤 하고 싶기 때문에 ScrollView가 ScrollView Children만큼 크게 해주고 싶다.
    flexDirection: 'row',
  },
  day: {
    // flex가 적용이 안되니, 전체 스크린 사이즈를 가져와야 하나의 아이템이 하나의 스크롤 페이지를 차지함.
    // flex: 1, 
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  }
});
