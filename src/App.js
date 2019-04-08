// In App.js in a new project

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TwoArtists from "./1. Two Artists";
import CarelessRenders from "./2. Careless Renders";
import Optimized from "./3. Optimized Renders";
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
          text="Unoptimized FlatList"
          pageName="CarelessRenders"
          backgroundColor="red"
        />
        <PageLink
          {...this.props}
          text="Optimized version of a FlatList"
          pageName="OptimizedRenders"
          backgroundColor="green"
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
    height: 100
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
  },
  OptimizedRenders: {
    screen: Optimized
  }
});

export default createAppContainer(AppNavigator);
