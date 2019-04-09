import {StyleSheet} from 'react-native';
import {HEADER_HEIGHT, ITEM_PADDING} from './constrants';

export default StyleSheet.create({
  listContainer: {
    paddingLeft: ITEM_PADDING * 2,
    paddingRight: ITEM_PADDING * 2,
    paddingTop: ITEM_PADDING * 2
  },
  listWithHeader:{
    paddingTop: ITEM_PADDING * 2 + HEADER_HEIGHT
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
