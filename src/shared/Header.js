import { Animated, Text, TouchableOpacity } from "react-native";
import { BORDER_RADIUS, HEADER_HEIGHT, PRIMARY_COLOR } from "./constrants";
import React from "react";
import tinycolor2 from "tinycolor2";

const getSelectedArtists = (selected, artists) => {
  return Object.keys(selected)
    .filter(key => selected[key])
    .map(key => artists.find(a => a.id === key));
};

const selectedCount = (selected, artists) => {
  return getSelectedArtists(selected, artists).length;
};

const getSelectedListeners = (selected, artists) => {
  return getSelectedArtists(selected, artists).reduce(
    (count, artist) => count + artist.listeners,
    0
  );
};

const numberWithSpaces = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const Header = ({ selected, artists, style }) => (
  <Animated.View
    style={[
      {
        position: "absolute",
        height: HEADER_HEIGHT,
        backgroundColor: PRIMARY_COLOR,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center"
      },
      style
    ]}
  >
    <Text style={{ fontSize: 23, color: "white" }}>Lithuania top artists</Text>
    <Text style={{ fontSize: 16, color: "rgba(255,255,255, 0.8)" }}>
      Selected {selectedCount(selected, artists)} with total listeners{" "}
      {numberWithSpaces(getSelectedListeners(selected, artists))}
    </Text>
  </Animated.View>
);

export default Header;
