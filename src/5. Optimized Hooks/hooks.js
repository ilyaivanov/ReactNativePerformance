import {useReducer, useState} from 'react';
import {fetchArtist, updatePercents} from '../shared/api';
import {COUNTRY} from '../shared/constrants';

export const useArtistSelection = () => {
  const reducer = (selected, id) => ({
    ...selected,
    [id]: !selected[id],
  });
  return useReducer(reducer, {});
};

export const useArtists = (setArtistsCount) => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const loadMoreItems = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    fetchArtist(COUNTRY, newPage).then(newArtists => {
        const totalArtists = artists.concat(newArtists);
        setArtists(updatePercents(totalArtists));
        setArtistsCount(totalArtists.length);
      },
    );
  };

  return [
    artists,
    loadMoreItems,
  ];
};
