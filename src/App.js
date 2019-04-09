import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TwoArtists from "./1. Two Artists";
import CarelessRenders from "./2. Careless Renders";
import Optimized from "./3. Optimized Renders";
import CarelessHooks from "./4. Careless Hooks";
import OptimizedHooks from "./5. Optimized Hooks";
import InteractionManager from "./6. InteractionManager demo";
import NonnativeAnimation from "./7. Non-native animation";
import NativeAnimation from "./8. Native animation";
import {createAppContainer, createStackNavigator, Header} from "react-navigation";
import {PRIMARY_COLOR} from './shared/constrants';
//uncomment for enable bridge logging
// import 'initiateLogger';
const red = '#D32F2F';
const green = '#388E3C';
const items = [
  {
    text: "Two artists side by side",
    pageName: "TwoArtists",
    backgroundColor: PRIMARY_COLOR,
  },
  {
    text: "Careless FlatList",
    pageName: "CarelessRenders",
    backgroundColor: red,
  },
  {
    text: "Optimized FlatList",
    pageName: "OptimizedRenders",
    backgroundColor: green,
  },
  {
    text: "Careless Hooks",
    pageName: "CarelessHooks",
    backgroundColor: red,
  },
  {
    text: "Optimized Hooks",
    pageName: "OptimizedHooks",
    backgroundColor: green,
  },
  {
    text: "Long operations",
    pageName: "InteractionManager",
    backgroundColor: PRIMARY_COLOR,
  },
  {
    text: "Careless animation (non-native)",
    pageName: "NonnativeAnimation",
    backgroundColor: red,
  },
  {
    text: "Optimized animation (native)",
    pageName: "NativeAnimation",
    backgroundColor: green,
  },
];

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "React-Native Performance",
  };

  render() {
    return (
      <View>
        {items.map(item => (
          <PageLink {...this.props} {...item} key={item.pageName}/>
        ))}
      </View>
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
    height: (Dimensions.get("window").height - Header.HEIGHT) / items.length,
  },
  linkText: {
    color: "white",
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
  NonnativeAnimation: {
    screen: NonnativeAnimation,
  },
  NativeAnimation: {
    screen: NativeAnimation,
  },
});

export default createAppContainer(AppNavigator);
