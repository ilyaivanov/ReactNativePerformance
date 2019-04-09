import React from "react";
import { FlatList, View } from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import {
  COUNTRY,
  fetchArtist,
  getArtistSize,
  LoadingIndicator,
  styles,
  updatePercents,
  withNavigation
} from "../shared";

class OptimizedRenders extends React.Component {
  state = {
    artists: [],
    currentPage: 0,
    selected: {}
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
    this.props.setArtistsCount(newArtists.length);
  };

  loadMoreItems = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({ currentPage: newPage });
    fetchArtist(COUNTRY, newPage).then(this.concatMoreArtists);
  };

  firstItemStyle = [styles.artistContainer, styles.firstArtistInRow];

  render() {
    const { columnsCount } = this.props;
    const size = getArtistSize(columnsCount);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          key={"FlatList" + columnsCount}
          contentContainerStyle={[
            styles.listContainer,
            this.state.artists.length === 0 && styles.emptyList
          ]}
          data={this.state.artists}
          keyExtractor={ar => ar.id}
          numColumns={columnsCount}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator />}
          renderItem={({ item, index }) => (
            <ArtistInfo
              style={
                index % columnsCount === 0
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
      </View>
    );
  }
}

export default withNavigation(OptimizedRenders, "Render+");
