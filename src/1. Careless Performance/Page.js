import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Item from './ArtistInfo';


export default class App extends Component {
  render() {
    const size = Dimensions.get('window').width / 3;

    return (
      <View style={styles.container}>
        <Item name="Some Name" size={size} listeners={137000} percent={50}/>
        <Item name="Another Name" size={size} listeners={60000} percent={25}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


