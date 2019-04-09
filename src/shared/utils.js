import React from "react";
import {Dimensions} from "react-native";
import {ITEM_PADDING} from "./constrants";

export const toggleColumns = currentColumns => {
  const maxColumns = 5;
  const minColumns = 2;
  const nextColumns = currentColumns + 1;
  return nextColumns > maxColumns ? minColumns : nextColumns;
};

export const getArtistSize = numberOfColumns =>
  (Dimensions.get("window").width - ITEM_PADDING * (4 + numberOfColumns - 1)) /
  numberOfColumns;
