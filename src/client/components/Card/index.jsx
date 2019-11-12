import React from 'react';

import styles from './styles.scss';

export function Card(props) {
  const { track } = props;
  return (
    <div className={styles.container}>
      <div>{track.artists.map(a => a.name).join(', ')}</div>
      <div>{track.name}</div>
      <div className={styles.buttons}>
        <a target="_blank" href={track.preview_url} className={styles.button}>
          Pre
        </a>
        <a target="_blank" href={track.external_urls.spotify} className={styles.button}>
          Tra
        </a>
      </div>
    </div>
  );
}
