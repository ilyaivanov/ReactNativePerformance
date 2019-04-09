import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useArtists } from "../5. Optimized Hooks/hooks";
import {
  ArtistInfo,
  LoadingIndicator,
  styles,
  getArtistSize,
  withNavigation
} from "../shared";
import { useArtistSelection } from "./carelessHooks";

const firstItemStyle = [styles.artistContainer, styles.firstArtistInRow];

const CarelessHooks = ({ columnsCount, setArtistsCount }) => {
  const [selected, toggleSelection] = useArtistSelection();
  const [artists, loadMore] = useArtists(setArtistsCount);

  useEffect(loadMore, []);

  const size = getArtistSize(columnsCount);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        key={"FlatList" + columnsCount}
        contentContainerStyle={[
          styles.listContainer,
          artists.length === 0 && styles.emptyList
        ]}
        data={artists}
        keyExtractor={ar => ar.id}
        numColumns={columnsCount}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<LoadingIndicator />}
        renderItem={({ item, index }) => (
          <ArtistInfo
            style={
              index % columnsCount === 0
                ? firstItemStyle
                : styles.artistContainer
            }
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
export default withNavigation(CarelessHooks, "Hooks-");
