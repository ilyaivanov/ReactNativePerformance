import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import { fetchArtist, updatePercents } from "../shared/api";
import { ITEM_PADDING } from "../shared/constrants";
import { LoadingIndicator } from "../shared/LoadingIndicator";

class CarelessRenders extends React.Component {
  static navigationOptions = {
    title: "Careless FlatList"
  };

  state = {
    artists: [],
    currentPage: 0,
    selected: {}
  };

  componentDidMount() {
    this.loadMoreItems();
  }

  onPress = id =>
    this.setState({
      selected: {
        ...this.state.selected,
        [id]: !this.state.selected[id]
      }
    });

  concatMoreArtists = artists => {
    const newArtists = this.state.artists.concat(artists);

    this.setState({ artists: updatePercents(newArtists) });
  };

  loadMoreItems = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({ currentPage: newPage });
    fetchArtist("spain", newPage).then(this.concatMoreArtists);
  };

  render() {
    const size = (Dimensions.get("window").width - ITEM_PADDING * 6) / 3;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={[
            s.listContainer,
            this.state.artists.length === 0 && s.emptyList
          ]}
          data={this.state.artists}
          keyExtractor={ar => ar.id}
          numColumns={3}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator />}
          renderItem={({ item, index }) => (
            <ArtistInfo
              style={[s.artistContainer, index % 3 === 0 && s.firstArtistInRow]}
              size={size}
              percent={item.percent}
              id={item.id}
              onPress={() => this.onPress(item.id)}
              isSelected={this.state.selected[item.id]}
              name={item.name}
              url={item.image}
            />
          )}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  listContainer: {
    paddingLeft: ITEM_PADDING * 2,
    paddingRight: ITEM_PADDING * 2,
    paddingTop: ITEM_PADDING * 2
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  artistContainer: {
    marginLeft: ITEM_PADDING,
    marginBottom: ITEM_PADDING
  },
  firstArtistInRow: {
    marginLeft: undefined
  }
});

export default CarelessRenders;
