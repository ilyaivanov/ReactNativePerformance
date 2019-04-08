import {useState} from 'react';
import {fetchArtist, updatePercents} from '../shared/api';

export const useArtistSelection = () => {
  const [selected, setSelected] = useState(0);
  return [
    selected,
    id => {
      setSelected({
        ...selected,
        [id]: !selected[id],
      });
    },
  ];
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
