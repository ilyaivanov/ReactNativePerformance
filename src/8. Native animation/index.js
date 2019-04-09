import React from "react";
import {Animated, FlatList, LayoutAnimation, NativeModules, View} from "react-native";
import {
  ArtistInfo,
  COUNTRY,
  fetchArtist,
  getArtistSize,
  Header,
  HEADER_HEIGHT,
  LoadingIndicator,
  styles,
  updatePercents,
  withNavigation,
} from "../shared";

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class NativeAnimation extends React.Component {
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
      LayoutAnimation.spring();
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

  clampedOffset = Animated.diffClamp(this.offset, 0, HEADER_HEIGHT).interpolate(
    {
      inputRange: [0, 1],
      outputRange: [0, -1],
    },
  );

  headerStyle = {transform: [{translateY: this.clampedOffset}]};

  opacity = this.clampedOffset.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [0, 1],
  });

  render() {
    const {columnsCount} = this.props;

    const size = getArtistSize(columnsCount);
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          key={"FlatList" + columnsCount}
          bounces={false}
          contentContainerStyle={[
            styles.listContainer,
            styles.listWithHeader,
            this.state.artists.length === 0 && styles.emptyList,
          ]}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.offset}}}],
            {useNativeDriver: true},
          )}
          data={this.state.artists}
          keyExtractor={ar => ar.id}
          numColumns={columnsCount}
          onEndReached={this.loadMoreItems}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<LoadingIndicator/>}
          renderItem={({item, index}) => (
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
        <Header
          artists={this.state.artists}
          selected={this.state.selected}
          style={this.headerStyle}
          textStyle={{opacity: this.opacity}}
        />
      </View>
    );
  }
}

export default withNavigation(NativeAnimation, "Native");
