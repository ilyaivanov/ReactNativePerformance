import React, { Component } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ArtistInfo from "../shared/ArtistInfo";

export default class App extends Component {
  static navigationOptions = {
    title: "Two Artists"
  };

  state = {
    selected: {
      "1": false,
      "2": true
    }
  };

  onPress = id =>
    this.setState({
      selected: {
        ...this.state.selected,
        [id]: !this.state.selected[id]
      }
    });

  render() {
    const size = Dimensions.get("window").width / 3;
    const artists = [
      {
        id: "1",
        url: "https://picsum.photos/g/132/132/?length=14",
        name: "Artist 1",
        listeners: 137000,
        percent: 70
      },
      {
        id: "2",
        url: "https://picsum.photos/g/132/132/?length=32",
        name: "Artist 2",
        listeners: 60000,
        percent: 25
      }
    ];
    return (
      <SafeAreaView style={styles.page}>
        <Text style={{ textAlign: "center", fontSize: 18, padding: 20 }}>
          This is a playground for two Artist in isolation. Makes it easy to
          check different tools on how they handle redundant renders. Press on
          the artists and watch for 'render' calls in the{" "}
          <Text style={{ fontWeight: "bold" }}>dev console</Text> (don't forget
          to enable Debug mode)
        </Text>
        <View style={styles.container}>
          {artists.map(artist => (
            <ArtistInfo
              key={artist.id}
              size={size}
              {...artist}
              onPress={this.onPress}
              isSelected={this.state.selected[artist.id]}
            />
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
