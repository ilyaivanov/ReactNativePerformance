// In App.js in a new project

import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import TwoArtists from "./1. Two Artists";
import CarelessRenders from "./2. Careless Renders";
import Optimized from "./3. Optimized Renders";
import CarelessHooks from "./4. Careless Hooks";
import OptimizedHooks from "./5. Optimized Hooks";
import InteractionManager from "./6. InteractionManager demo";
import {createAppContainer, createStackNavigator} from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "React-Native Performance",
  };

  render() {
    const items = [
      {
        text:
          "Two Artists side by side. Use for testing why-did-you-update tools or profiles. Selecting one artist will trigger a render in another",
        pageName: "TwoArtists",
      }, {
        text:
          "Unoptimized FlatList",
        pageName: "CarelessRenders",
      }, {
        text: "Optimized version of a FlatList",
        pageName: "OptimizedRenders",
      }, {
        text: "Careless hooks",
        pageName: "CarelessHooks",
      }, {
        text: "Optimized hooks",
        pageName: "OptimizedHooks",
      }, {
        text: "Halt on long operations",
        pageName: "InteractionManager",
      },
    ];
    return (
      <ScrollView>
        {
          items.map(item =>
            <PageLink
              {...this.props}
              key={item.pageName}
              {...item}
            />)
        }
      </ScrollView>
    );
  }
}

const PageLink = ({text, pageName, navigation, backgroundColor}) => (
  <TouchableOpacity
    style={[s.link, {backgroundColor}]}
    onPress={() => navigation.navigate(pageName)}
  >
    <Text style={s.linkText}>{text}</Text>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  link: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  linkText: {
    textAlign: "center",
    fontSize: 23,
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  TwoArtists: {
    screen: TwoArtists,
  },
  CarelessRenders: {
    screen: CarelessRenders,
  },
  OptimizedRenders: {
    screen: Optimized,
  },
  CarelessHooks: {
    screen: CarelessHooks,
  },
  OptimizedHooks: {
    screen: OptimizedHooks,
  },
  InteractionManager: {
    screen: InteractionManager,
  },
});

export default createAppContainer(AppNavigator);
