// In App.js in a new project

import React from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import TwoArtists from "./1. Two Artists";
import CarelessRenders from "./2. Careless Renders";
import Optimized from "./3. Optimized Renders";
import CarelessHooks from "./4. Careless Hooks";
import OptimizedHooks from "./5. Optimized Hooks";
import InteractionManager from "./6. InteractionManager demo";
import NonnativeAnimation from "./7. Non-native animation";
import NativeAnimation from "./8. Native animation";
import {createAppContainer, createStackNavigator} from "react-navigation";
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue';


let messageCount = 0;
const logSpy = (info) => {
  const fromTo = info.type === 0 ? 'TO JS: ' : 'TO NATIVE: ';
  const methodSignature = info.module + '.' + info.method + '(' + JSON.stringify(info.args) + ')';
  messageCount++;
  console.log(messageCount, fromTo, methodSignature);
};

//uncomment for enable bridge logging
MessageQueue.spy(logSpy);

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
      }, {
        text: "Non-native animation",
        pageName: "NonnativeAnimation",
      }, {
        text: "Native animation",
        pageName: "NativeAnimation",
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
    height: 70,
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
  NonnativeAnimation: {
    screen: NonnativeAnimation,
  },
  NativeAnimation: {
    screen: NativeAnimation,
  },
});

export default createAppContainer(AppNavigator);
