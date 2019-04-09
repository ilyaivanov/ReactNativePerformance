import {StyleSheet} from 'react-native';
import {HEADER_HEIGHT, ITEM_PADDING} from './constrants';

export default StyleSheet.create({
  listContainer: {
    paddingLeft: ITEM_PADDING,
    paddingRight: ITEM_PADDING,
    paddingTop: ITEM_PADDING
  },
  listWithHeader:{
    paddingTop: ITEM_PADDING + HEADER_HEIGHT
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
