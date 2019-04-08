import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';


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


const Item = ({size, listeners, percent, name}) => (
  <View style={{width: size}}>
    <View style={{width: size, height: size}}>
      <Image style={{width: size, height: size, borderRadius: 6}}
             source={{uri: 'https://picsum.photos/g/132/132/?length=30'}}/>

      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 25,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        paddingLeft: 10,
      }}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>{numberWithSpaces(listeners)}</Text>

        <View style={{
          zIndex: -1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 25,
          width: size * (percent / 100),
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        </View>
      </View>
    </View>
    <View>
      <Text style={{fontSize: 21, textAlign:'center'}}>{name}</Text>
    </View>
  </View>
);

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
