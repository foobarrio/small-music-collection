module.exports = class Collection {
  constructor() {
    this.albums = [];
    this.albumsByTitle = new Map();
  }

  add(title, artist) {
    if (this.albumsByTitle.has(title)) {
      return false;
    }

    const album = {
      title,
      artist,
      isPlayed: false,
    };

    this.albums.push(album);
    this.albumsByTitle.set(title, album);

    return true;
  }

  play(title) {
    if (this.albumsByTitle.has(title)) {
      const album = this.albumsByTitle.get(title);
      album.isPlayed = true;
      return true;
    }

    return false;
  }

  show({ artist = null, unplayed = false }) {
    const albums = this.albums.filter((album) => {
      let showArtist = true;
      let showPlayState = true;

      if (artist) {
        showArtist = album.artist === artist;
      }

      if (unplayed) {
        showPlayState = !album.isPlayed;
      }

      return showArtist && showPlayState;
    });

    return albums;
  }
};
