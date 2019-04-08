// In App.js in a new project

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TwoArtists from "./1. Two Artists";
import CarelessRenders from "./2. Careless Renders";
import { createAppContainer, createStackNavigator } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "React-Native Performance"
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PageLink
          {...this.props}
          text="Two Artists side by side. Use for testing why-did-you-update tools or profiles. Selecting one artist will trigger a render in another"
          pageName="TwoArtists"
          backgroundColor="#aaFFFF"
        />
        <PageLink
          {...this.props}
          text="Care-less renders in a big FlatList. To feel the most significant difference use old Android device, turn on Power Save mode and scroll as down as possible before pressing on the items"
          pageName="CarelessRenders"
          backgroundColor="red"
        />
      </View>
    );
  }
}

const PageLink = ({ text, pageName, navigation, backgroundColor }) => (
  <TouchableOpacity
    style={[s.link, { backgroundColor }]}
    onPress={() => navigation.navigate(pageName)}
  >
    <Text style={s.linkText}>{text}</Text>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  link: {
    justifyContent: "center",
    alignItems: "center",
    height: 150
  },
  linkText: {
    textAlign: "center",
    fontSize: 23
  }
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  TwoArtists: {
    screen: TwoArtists
  },
  CarelessRenders: {
    screen: CarelessRenders
  }
});

export default createAppContainer(AppNavigator);
