import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function ArtistInfo({id, size,url,  listeners, percent, name, isSelected, onPress}) {
  console.log('ArtistInfo.render');
  return <TouchableOpacity onPress={() => onPress(id)} style={{width: size}}>
    <View style={{width: size, height: size}}>
      <Image style={{width: size, height: size, borderRadius: BORDER_RADIUS}}
             source={{uri: url}}/>

      <View style={[s.bar]}>
        <Text style={s.listeners}>{numberWithSpaces(listeners)}</Text>
        <View style={[s.bar, s.filledBar, {width: size * (percent / 100)}]}>
        </View>
      </View>
      {isSelected && <View style={s.selectedBorder}/>}
    </View>
    <View>
      <Text style={[s.artistTitle, isSelected && s.selectedTitle]}>{name}</Text>
    </View>
  </TouchableOpacity>;
}

const SELECTION_COLOR = 'green';
const BORDER_RADIUS = 6;

const s = StyleSheet.create({
  bar: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: 30,
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
  selectedTitle: {
    color: SELECTION_COLOR,
  },
  selectedBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BORDER_RADIUS,
    borderWidth: 4,
    borderColor: SELECTION_COLOR,
    borderStyle: 'solid',
  },
});

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
