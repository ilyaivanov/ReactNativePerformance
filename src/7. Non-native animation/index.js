import React from "react";
import {Animated, FlatList, View} from "react-native";
import ArtistInfo from "../shared/ArtistInfo";
import {fetchArtist, updatePercents} from "../shared/api";
import {COUNTRY, HEADER_HEIGHT} from "../shared/constrants";
import {LoadingIndicator} from "../shared/LoadingIndicator";
import styles from "../shared/styles";
import Header from "../shared/Header";
import {getArtistSize, withNavigation} from '../shared';

class NonNativeAnimation extends React.Component {

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

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.columnsCount !== this.props.columnsCount) {
      this.offset.setValue(0);
    }
  }

  concatMoreArtists = artists => {
    const newArtists = this.state.artists.concat(artists);

    this.setState({artists: updatePercents(newArtists)});
    this.props.navigation.setParams({artistsCount: newArtists.length});
  };

  loadMoreItems = () => {
    const newPage = this.state.currentPage + 1;
    this.setState({currentPage: newPage});
    fetchArtist(COUNTRY, newPage).then(this.concatMoreArtists);
  };

  firstItemStyle = [styles.artistContainer, styles.firstArtistInRow];

  offset = new Animated.Value(0);

  prevOffset = undefined;

  onScroll(event) {
    const y = event.nativeEvent.contentOffset.y;
    if (this.prevOffset === undefined) {
      this.prevOffset = y;
    } else {
      const diff = this.prevOffset - y;
      const newOffset = this.offset._value + diff;
      this.offset.setValue(Math.min(0, Math.max(newOffset, -HEADER_HEIGHT)));
      this.prevOffset = event.nativeEvent.contentOffset.y;
    }
  }

  opacity = this.offset.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  render() {
    const {columnsCount} = this.props;
    const size = getArtistSize(columnsCount);
    return (
      <View style={{flex: 1}}>
        <FlatList
          key={"FlatList" + columnsCount}
          bounces={false}
          contentContainerStyle={[
            styles.listContainer,
            styles.listWithHeader,
            this.state.artists.length === 0 && styles.emptyList,
          ]}
          scrollEventThrottle={16}
          onScroll={this.onScroll.bind(this)}
          data={this.state.artists}
          keyExtractor={ar => ar.id}
          numColumns={columnsCount}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator/>}
          renderItem={({item, index}) => (
            <ArtistInfo
              style={
                index % columnsCount === 0 ? this.firstItemStyle : styles.artistContainer
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
          style={{marginTop: this.offset}}
          textStyle={{opacity: this.opacity}}
        />
      </View>
    );
  }
}

export default withNavigation(NonNativeAnimation, 'Non-Native');
