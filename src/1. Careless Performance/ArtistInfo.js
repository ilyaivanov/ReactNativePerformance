import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Item({size, listeners, percent, name}) {
  return <View style={{width: size}}>
    <View style={{width: size, height: size}}>
      <Image style={{width: size, height: size, borderRadius: BORDER_RADIUS}}
             source={{uri: 'https://picsum.photos/g/132/132/?length=30'}}/>

      <View style={[s.bar]}>
        <Text style={s.listeners}>{numberWithSpaces(listeners)}</Text>
        <View style={[s.bar, s.filledBar, {width: size * (percent / 100)}]}>
        </View>
      </View>
    </View>
    <View>
      <Text style={s.artistTitle}>{name}</Text>
    </View>
  </View>;
}

const BORDER_RADIUS = 6;

const s = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 25,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  filledBar: {
    zIndex: -1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  listeners: {
    color: 'white', fontWeight: '600', fontSize: 16,
  },
  artistTitle: {
    fontSize: 21, textAlign: 'center',
  },
});

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
