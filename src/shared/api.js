import { lastFM } from "../../apiKeys";

export const fetchArtist = (country, page) => {
  console.log(`Fetching 50 more items for ${page}th page for ${country}`);
  return fetch(
    `http://ws.audioscrobbler.com/2.0/?method=geo.getTopArtists&country=${country}&api_key=${lastFM}&format=json&limit=50&page=${page}`
  )
    .then(res => res.json())
    .then(response => {
      return response.topartists.artist.map(mapArtist);
    });
};

const mapArtist = artist => ({
  name: artist.name,
  listeners: Number(artist.listeners),
  id: artist.mbid,
  image: artist.image[3]["#text"]
});

export const updatePercents = artists => {
  const max = Math.max(...artists.map(a => a.listeners));

  return artists.map(a => ({
    ...a,
    percent: (Math.floor(a.listeners) / max) * 100
  }));
};
