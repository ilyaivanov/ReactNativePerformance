import React from "react";
import {Dimensions, FlatList, View} from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import {fetchArtist, updatePercents} from "../shared/api";
import {ITEM_PADDING} from "../shared/constrants";
import {LoadingIndicator} from "../shared/LoadingIndicator";
import styles from "../shared/styles";

class CarelessRenders extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    const count = state.params ? state.params.artistsCount : 0;
    return {
      title: `Quick. Artists: ${count | 0}`,
    };
  };

  state = {
    artists: [],
    currentPage: 0,
    selected: {},
  };

  componentDidMount() {
    this.loadMoreItems();
  }

  onPress = id => {
    this.setState({
      selected: {
        ...this.state.selected,
        [id]: !this.state.selected[id],
      },
    });
  };

  concatMoreArtists = artists => {
    const newArtists = this.state.artists.concat(artists);

    this.setState({artists: updatePercents(newArtists)});
    this.props.navigation.setParams({artistsCount: newArtists.length});
  };

  loadMoreItems = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({currentPage: newPage});
    fetchArtist("spain", newPage).then(this.concatMoreArtists);
  };

  firstItemStyle = [styles.artistContainer, styles.firstArtistInRow];

  render() {
    const size = (Dimensions.get("window").width - ITEM_PADDING * 6) / 3;
    return (
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={[
            styles.listContainer,
            this.state.artists.length === 0 && styles.emptyList,
          ]}
          data={this.state.artists}
          keyExtractor={ar => ar.id}
          numColumns={3}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator/>}
          renderItem={({item, index}) => (
            <ArtistInfo
              style={
                index % 3 === 0 ? this.firstItemStyle : styles.artistContainer
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

export default CarelessRenders;
