import {useState, useReducer} from 'react';
import {fetchArtist, updatePercents} from '../shared/api';

export const useArtistSelection = () => {
  const reducer = (selected, id) => ({
    ...selected,
    [id]: !selected[id]
  });
  return useReducer(reducer, {});
};

export const useArtists = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const loadMoreItems = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    fetchArtist("spain", newPage).then(newArtists =>
      setArtists(updatePercents(artists.concat(newArtists))),
    );
  };

  return [
    artists,
    loadMoreItems,
  ];
};
