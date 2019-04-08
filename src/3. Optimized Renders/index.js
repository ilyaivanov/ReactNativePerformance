import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, View } from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import { fetchArtist, updatePercents } from "../shared/api";
import { ITEM_PADDING } from "../shared/constrants";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import styles from "../shared/styles";

const CarelessRenders = () => {
  const [state, setState] = useState({
    artists: [],
    currentPage: 0,
    selected: {}
  });

  const onPress = id => {
    setState({
      selected: {
        ...state.selected,
        [id]: !state.selected[id]
      }
    });
  };

  const concatMoreArtists = artists => {
    const newArtists = state.artists.concat(artists);

    setState({ artists: updatePercents(newArtists) });
    props.navigation.setParams({ artistsCount: newArtists.length });
  };

  const loadMoreItems = () => {
    const newPage = state.currentPage + 1;
    setState({ currentPage: newPage });
    fetchArtist("spain", newPage).then(concatMoreArtists);
  };

  const firstItemStyle = [styles.artistContainer, styles.firstArtistInRow];

  useEffect(loadMoreItems, []);

  const size = (Dimensions.get("window").width - ITEM_PADDING * 6) / 3;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={[
          styles.listContainer,
          state.artists.length === 0 && styles.emptyList
        ]}
        data={state.artists}
        keyExtractor={ar => ar.id}
        numColumns={3}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<LoadingIndicator />}
        renderItem={({ item, index }) => (
          <ArtistInfo
            style={index % 3 === 0 ? firstItemStyle : styles.artistContainer}
            size={size}
            percent={item.percent}
            id={item.id}
            onPress={onPress}
            isSelected={state.selected[item.id]}
            name={item.name}
            url={item.image}
          />
        )}
      />
    </View>
  );
};

export default CarelessRenders;
