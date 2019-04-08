import React from "react";
import {ActivityIndicator, Dimensions, FlatList, StyleSheet, View} from "react-native";
import ArtistInfo, {SELECTION_COLOR} from "../ArtistInfo";
import {lastFM} from '../../apiKeys';

const mapArtist = (artist, maxListeners) => ({
  name: artist.name,
  listeners: Number(artist.listeners),
  id: artist.mbid,
  percent: Math.floor((Number(artist.listeners) / maxListeners) * 100),
  image: artist.image[3]["#text"],
});

const updatePercents = artists => {
  const max = Math.max(...artists.map(a => a.listeners));

  return artists.map(a => ({
    ...a,
    percent: (Math.floor(a.listeners) / max) * 100,
  }));
};

class CarelessRenders extends React.Component {
  static navigationOptions = {
    title: "Careless FlatList",
  };

  state = {
    artists: [],
    currentPage: 0,
    selected: {},
  };

  componentDidMount() {
    this.loadMoreItems();
  }

  onPress = id =>
    this.setState({
      selected: {
        ...this.state.selected,
        [id]: !this.state.selected[id],
      },
    });

  loadMoreItems = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({currentPage: newPage});
    console.log(`Fetching 50 more items for ${newPage}th page`);
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&country=lithuania&api_key=${lastFM}&format=json&limit=50&page=${newPage}`,
    )
      .then(res => res.json())
      .then(response => {
        const newArtists = this.state.artists.concat(
          response.topartists.artist.map(mapArtist),
        );
        this.setState({artists: updatePercents(newArtists)});
      });
  };

  render() {
    const size = (Dimensions.get("window").width - ITEM_PADDING * 6) / 3;
    return (
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={[
            s.listContainer,
            this.state.artists.length === 0 && s.emptyList,
          ]}
          data={this.state.artists}
          keyExtractor={ar => ar.id}
          numColumns={3}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <ActivityIndicator
              style={{paddingBottom: ITEM_PADDING}}
              size="large"
              color={SELECTION_COLOR}
            />
          }
          renderItem={({item, index}) => (
            <ArtistInfo
              style={[s.artistContainer, index % 3 === 0 && s.firstArtistInRow]}
              size={size}
              percent={item.percent}
              id={item.id}
              onPress={() => this.onPress(item.id)}
              isSelected={this.state.selected[item.id]}
              listeners={item.listeners}
              name={item.name}
              url={item.image}
            />
          )}
        />
      </View>
    );
  }
}

const ITEM_PADDING = 10;

const s = StyleSheet.create({
  listContainer: {
    paddingLeft: ITEM_PADDING * 2,
    paddingRight: ITEM_PADDING * 2,
    paddingTop: ITEM_PADDING * 2,
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  artistContainer: {
    marginLeft: ITEM_PADDING,
    marginBottom: ITEM_PADDING,
  },
  firstArtistInRow: {
    marginLeft: undefined,
  },
});

export default CarelessRenders;
