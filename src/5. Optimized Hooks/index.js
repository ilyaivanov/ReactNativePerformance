import React, { useEffect } from "react";
import { Dimensions, FlatList, View } from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import { ITEM_PADDING } from "../shared/constrants";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import styles from "../shared/styles";
import { useArtists, useArtistSelection } from "./hooks";

const firstItemStyle = [styles.artistContainer, styles.firstArtistInRow];

const CarelessHooks = () => {
  const [selected, toggleSelection] = useArtistSelection();
  const [artists, loadMore] = useArtists();

  useEffect(loadMore, []);

  const size = (Dimensions.get("window").width - ITEM_PADDING * 6) / 3;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={[
          styles.listContainer,
          artists.length === 0 && styles.emptyList
        ]}
        data={artists}
        keyExtractor={ar => ar.id}
        numColumns={3}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<LoadingIndicator />}
        // getItemLayout={(data, index) => ({
        //   length: size + ITEM_PADDING,
        //   offset: (size + ITEM_PADDING) * index,
        //   index
        // })}
        renderItem={({ item, index }) => (
          <ArtistInfo
            style={index % 3 === 0 ? firstItemStyle : styles.artistContainer}
            size={size}
            percent={item.percent}
            id={item.id}
            onPress={toggleSelection}
            isSelected={selected[item.id]}
            name={item.name}
            url={item.image}
          />
        )}
      />
    </View>
  );
};

export default CarelessHooks;
