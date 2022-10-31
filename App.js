import { StyleSheet, SafeAreaView, Text, Button, Pressable, Image, View, FlatList } from "react-native";
import { millisToMinutesAndSeconds, useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";

export default function App() {
  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth();

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <View style={styles.indexContainer}>
          <Text style={styles.text}>{index +1}</Text>
        </View>
        <Image style={styles.albumCover} source={{ uri: item.album.images[0].url }}></Image>
        <View style={styles.songAndArtistContainer}>
          <Text numberOfLines={1} style={{ ...styles.text, color:'white' }}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.text}>{item.artists[0].name}</Text>
        </View>
        <Text style={{ ...styles.text, margin:5, flex:2 }} numberOfLines={1}>{item.album.name}</Text>
        <Text style={{ ...styles.text, width: '10%' }} numberOfLines={1}>{millisToMinutesAndSeconds(item.duration_ms)}</Text>
      </View>
    )
  }

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
          <Pressable onPressIn={getSpotifyAuth}>
            <View style={styles.connectButton}>
              <Image style={{ height: 20, width: 20 }} resizeMode="contain" source={require("./assets/spotify-logo.png")}></Image>
              <Text style={{ color: "white", fontWeight: "bold", marginLeft: 5 }}>CONNECT WITH SPOTIFY</Text>
            </View>
          </Pressable>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList data={tracks} renderItem={renderItem}></FlatList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1,
  },
  connectButton: {
    backgroundColor: Themes.colors.spotify,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    alignSelf:'center',
  },
  text: {
    color: Themes.colors.gray,
  },
  row: {
    height:50,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    overflow:'hidden',
  },
  albumCover: {
    height: '100%',
    aspectRatio: 1,
    margin:10
  },
  indexContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  songAndArtistContainer: {
    flex:3,
    alignItems: 'flex-start',
    margin:5
  }
});
