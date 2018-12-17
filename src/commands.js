

const Collection = require('./collection');

const collection = new Collection();

const INVALID_COMMAND_REPSONSE = `
A small system for managing your music collection.

Usage:
  add "<title>" "<artist>"    Adds an album to the collection with the given title and artist. All albums are unplayed by default.
  play "<title>"              Marks a given album as played.
  show all                    Displays all of the albums in the collection
  show unplayed               Display all of the albums that are unplayed
  show all by "<artist>"      Shows all of the albums in the collection by the given artist
  show unplayed by "<artist>" Shows the unplayed albums in the collection by the given artist
  quit                        Quits the program
`;

function execute(line) {
  const command = line.trim().split(' ')[0];

  let response = INVALID_COMMAND_REPSONSE;

  switch (command) {
    case 'add': {
      const regex = /^add "([\S ]+)" "([\S ]+)"$/;
      const regexResult = regex.exec(line);

      if (regexResult) {
        const album = regexResult[1].trim();
        const artist = regexResult[2].trim();

        if (album.length === 0 || artist.length === 0) {
          response = 'An album cannot have an empty title or artist';
        } else if (collection.add(album, artist)) {
          response = `Added "${album}" by ${artist}`;
        } else {
          response = `Not added. Album "${album}" by ${artist} already exists in collection`;
        }
      }

      break;
    }

    case 'play': {
      const regex = /^play "([\S ]+)"$/;
      const regexResult = regex.exec(line);

      if (regexResult) {
        const album = regexResult[1].trim();

        if (collection.play(album)) {
          response = `You're listening to "${album}"`;
        } else {
          response = `"${album}" is not in your collection`;
        }
      }

      break;
    }

    case 'show': {
      const regex = /^show (all|unplayed)(?: by "([\S ]+)")?$/;
      const regexResult = regex.exec(line);

      if (regexResult) {
        const showOptions = {};

        showOptions.unplayed = regexResult[1] === 'unplayed';

        if (regexResult[2]) {
          showOptions.artist = regexResult[2]; // eslint-disable-line prefer-destructuring
        }

        response = '';
        const albums = collection.show(showOptions);

        if (albums.length === 0) {
          response = 'Nothing to show';
        } else {
          albums.forEach((album) => {
            response += `"${album.title}" by ${album.artist} (${album.isPlayed ? '' : 'un'}played)\n`;
          });
        }
      }

      break;
    }

    default:
  }

  return response;
}

module.exports = {
  execute,
  invalidCommandRepsonse: INVALID_COMMAND_REPSONSE,
};
