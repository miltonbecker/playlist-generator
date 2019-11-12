import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { Card } from '../Card';

import styles from './styles.scss';

export function Landing(props) {
  const [token, setToken] = useState(null);
  const [genres, setGenres] = useState(null);
  const [chosenGenre, setChosenGenre] = useState(null);

  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    if (!token)
      fetch('//miltonbecker.com:9998/token')
        .then(response => response.json())
        .then(response => {
          setToken(response.token);
        });
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        setGenres(response.genres.map(item => ({ label: item, value: item })));
      });
  }, [token]);

  const handleGenresChange = (option, action) => {
    setChosenGenre(option);
  };

  const handleGenerateButton = () => {
    console.log('chosenGenre', chosenGenre);

    fetch(
      `https://api.spotify.com/v1/recommendations?seed_genres=${chosenGenre.value}&min_popularity=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        setTracks(response.tracks);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Playlist Generator</h1>
      <div>
        <div className={styles.selectContainer}>
          <Select
            placeholder="Pick a Genre"
            noOptionsMessage={() => 'Loading...'}
            options={genres}
            onChange={handleGenresChange}
            value={chosenGenre}
            className={styles.select}
          />
        </div>
        <button className={styles.button} type="button" onClick={handleGenerateButton}>
          Generate!
        </button>
      </div>
      {tracks && (
        <div>
          <h2>You've got a playlist</h2>
          <div className={styles.resultContainer}>
            {tracks.map((track, index) => (
              <Card key={index} track={track} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
