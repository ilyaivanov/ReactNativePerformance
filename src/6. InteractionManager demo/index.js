import React from "react";
import { InteractionManager, Text, View } from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import { LoadingIndicator } from "../shared/LoadingIndicator";

class CarelessRenders extends React.Component {
  static navigationOptions = {
    title: "Interaction Manager"
  };
  state = {
    minValue: 0,
    maxValue: 0,
    count: 100000000,
    isRunning: false
  };

  calculateSmooth = () => {
    this.setState({ isRunning: true }, () =>
      InteractionManager.runAfterInteractions(this.calculate)
    );
  };

  calculateLaggy = () => {
    this.setState({ isRunning: true }, this.calculate);
  };

  calculate = () => {
    let minValue = Number.MAX_VALUE;
    let maxValue = 0;
    for (let i = 0; i < this.state.count; i++) {
      const rand = Math.random() * this.state.count;
      if (rand < minValue) minValue = rand;
      if (rand > maxValue) maxValue = rand;
    }
    this.setState({
      minValue,
      maxValue,
      isRunning: false
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <ArtistInfo
          size={150}
          percent={100}
          id={"1"}
          onPress={this.calculateLaggy}
          name={"Laggy"}
          url="https://picsum.photos/g/132/132/?length=10"
        />
        <View style={{ height: 50 }}>
          {this.state.isRunning ? (
            <LoadingIndicator />
          ) : (
            <View>
              <Text>
                Created {this.state.count} random numbers from 0 to{" "}
                {this.state.count}.{" "}
              </Text>
              <Text>Min {this.state.minValue}.</Text>
              <Text>Max: {this.state.maxValue}</Text>
            </View>
          )}
        </View>
        <ArtistInfo
          size={150}
          percent={100}
          id={"1"}
          onPress={this.calculateSmooth}
          name={"Smooth"}
          url="https://picsum.photos/g/132/132/?length=8"
        />
      </View>
    );
  }
}

export default CarelessRenders;
