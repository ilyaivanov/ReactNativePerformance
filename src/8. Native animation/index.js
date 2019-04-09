import React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  View,
  NativeModules,
  LayoutAnimation
} from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import { fetchArtist, updatePercents } from "../shared/api";
import { HEADER_HEIGHT, ITEM_PADDING } from "../shared/constrants";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import styles from "../shared/styles";
import Header from "../shared/Header";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class NativeAnimation extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const count = state.params ? state.params.artistsCount : 0;
    return {
      title: `Native. Artists: ${count | 0}`
    };
  };

  state = {
    artists: [],
    currentPage: 0,
    selected: {},
    numberOfColumns: 2
  };

  componentDidMount() {
    this.loadMoreItems();
  }

  onPress = id => {
    this.setState({
      selected: {
        ...this.state.selected,
        [id]: !this.state.selected[id]
      }
    });
  };

  concatMoreArtists = artists => {
    const newArtists = this.state.artists.concat(artists);

    this.setState({ artists: updatePercents(newArtists) });
    this.props.navigation.setParams({ artistsCount: newArtists.length });
  };

  loadMoreItems = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({ currentPage: newPage });
    fetchArtist("spain", newPage).then(this.concatMoreArtists);
  };

  firstItemStyle = [styles.artistContainer, styles.firstArtistInRow];

  offset = new Animated.Value(0);

  headerStyle = {
    transform: [
      {
        translateY: Animated.diffClamp(
          this.offset,
          0,
          HEADER_HEIGHT
        ).interpolate({
          inputRange: [0, 1],
          outputRange: [0, -1]
        })
      }
    ]
  };

  toggleView = () => {
    const maxColumns = 5;
    const minColumns = 2;
    const nextColumns = this.state.numberOfColumns + 1;
    const numberOfColumns = nextColumns > maxColumns ? minColumns : nextColumns;
    LayoutAnimation.spring();
    this.setState({ numberOfColumns });
  };

  render() {
    const size =
      (Dimensions.get("window").width -
        ITEM_PADDING * (4 + this.state.numberOfColumns - 1)) /
      this.state.numberOfColumns;
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          key={"FlatList" + this.state.numberOfColumns}
          bounces={false}
          contentContainerStyle={[
            styles.listContainer,
            styles.listWithHeader,
            this.state.artists.length === 0 && styles.emptyList
          ]}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.offset } } }],
            { useNativeDriver: true }
          )}
          data={this.state.artists}
          keyExtractor={ar => ar.id}
          numColumns={this.state.numberOfColumns}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator />}
          renderItem={({ item, index }) => (
            <ArtistInfo
              style={
                index % this.state.numberOfColumns === 0
                  ? this.firstItemStyle
                  : styles.artistContainer
              }
              size={size}
              percent={item.percent}
              id={item.id}
              onPress={this.onPress}
              isSelected={this.state.selected[item.id]}
              name={item.name}
              url={item.image}
            />
          )}
        />
        <Header
          artists={this.state.artists}
          selected={this.state.selected}
          style={this.headerStyle}
          toggleView={this.toggleView}
        />
      </View>
    );
  }
}

export default NativeAnimation;
