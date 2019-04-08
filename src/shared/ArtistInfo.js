import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tinycolor2 from "tinycolor2";
import { BORDER_RADIUS, PRIMARY_COLOR } from "./constrants";

function ArtistInfo({
  style,
  id,
  size,
  url,
  percent,
  name,
  isSelected,
  onPress
}) {
  console.log("ArtistInfo.render");
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={[{ width: size }, style]}
    >
      <View style={{ width: size, height: size }}>
        <Image
          style={{ width: size, height: size, borderRadius: BORDER_RADIUS }}
          source={{ uri: url }}
        />

        <View style={[s.bar]}>
          <Text style={s.listeners} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
          <View
            style={[
              s.bar,
              s.filledBar,
              percent < 95 && s.intermediatePercent,
              { width: size * (percent / 100) }
            ]}
          />
        </View>
        {isSelected && <View style={s.selectedBorder} />}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ArtistInfo);

const s = StyleSheet.create({
  bar: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: 25,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  filledBar: {
    zIndex: -1,
    backgroundColor: tinycolor2(PRIMARY_COLOR)
      .setAlpha(0.6)
      .toRgbString(),
    overflow: "hidden"
  },
  intermediatePercent: {
    borderBottomRightRadius: 0
  },
  listeners: {
    color: "white",
    fontWeight: "600",
    fontSize: 14
  },
  artistTitle: {
    fontSize: 18,
    textAlign: "center"
  },
  selectedTitle: {
    color: PRIMARY_COLOR
  },
  selectedBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BORDER_RADIUS,
    borderWidth: 4,
    borderColor: PRIMARY_COLOR,
    borderStyle: "solid"
  }
});
