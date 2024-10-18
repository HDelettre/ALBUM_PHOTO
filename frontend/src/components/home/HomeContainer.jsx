import React from 'react';
import AlbumCard from '../albumsAndPictures/albumCard';

const HomeContainer = ({allAlbums}) => {
  return (
    <div className='homeContainer'>
      {!allAlbums ? "Il n'y a pas d'album pour l'instant !" :
      <>
      {allAlbums.map((data) => <AlbumCard data={data} />)}
      </>}
    </div>
  );
}

export default HomeContainer;
