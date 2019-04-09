import React from "react";
import {toggleColumns} from "./utils";
import {Button} from 'react-native';
import {PRIMARY_COLOR} from './constrants';

export function withNavigation(WrappedComponent, title) {
  return class extends React.Component {
    static navigationOptions = ({navigation}) => {
      const {state} = navigation;
      const count = state.params ? state.params.artistsCount : 0;
      return {
        title: title + ` Artists: ${count | 0}`,
        headerRight: (
          <Button
            onPress={navigation.getParam("toggleView")}
            title="Columns"
            color={PRIMARY_COLOR}
          />
        ),
      };
    };

    state = {
      columnsCount: 3,
    };

    constructor(props, context) {
      super(props, context);
      this.props.navigation.setParams({toggleView: this.toggleColumns});
      this.props.navigation.setParams({artistsCount: this.toggleColumns});
    }

    toggleColumns = () => {
      this.setState({columnsCount: toggleColumns(this.state.columnsCount)});
    };

    setArtistsCount = artistsCount =>
      this.props.navigation.setParams({artistsCount});

    render() {
      return (
        <WrappedComponent
          {...this.props}
          columnsCount={this.state.columnsCount}
          setArtistsCount={this.setArtistsCount}
        />
      );
    }
  };
}
