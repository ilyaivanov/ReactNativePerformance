import { ActivityIndicator } from "react-native";
import { ITEM_PADDING, PRIMARY_COLOR } from "./constrants";
import React from "react";

export const LoadingIndicator = () => (
  <ActivityIndicator
    style={{ paddingBottom: ITEM_PADDING }}
    size="large"
    color={PRIMARY_COLOR}
  />
);
