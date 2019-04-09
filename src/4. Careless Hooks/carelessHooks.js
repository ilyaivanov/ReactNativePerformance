import {useState} from 'react';

export const useArtistSelection = () => {
  const [selected, setSelected] = useState({});
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

