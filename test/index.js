

const assert = require('assert');
const commands = require('../src/commands');

describe('add', () => {
  it('shows all before adding', () => {
    const response = commands.execute('show all');
    assert.equal(response, 'Nothing to show');
  });
  it('adds "Ride the Lightning" by Metallica', () => {
    const response = commands.execute('add "Ride the Lightning" "Metallica"');
    assert.equal(response, 'Added "Ride the Lightning" by Metallica');
  });

  it('rejects adding duplicate "Ride the Lightning" by Metallica', () => {
    const response = commands.execute('add "Ride the Lightning" "Metallica"');
    assert.equal(response, 'Not added. Album "Ride the Lightning" by Metallica already exists in collection');
  });

  it('adds "Licensed to Ill" by Beastie Boys', () => {
    const response = commands.execute('add "Licensed to Ill" "Beastie Boys"');
    assert.equal(response, 'Added "Licensed to Ill" by Beastie Boys');
  });

  it('adds "Paul\'s Boutique" by Beastie Boys', () => {
    const response = commands.execute('add "Paul\'s Boutique" "Beastie Boys"');
    assert.equal(response, 'Added "Paul\'s Boutique" by Beastie Boys');
  });

  it('adds "The Dark Side of the Moon" by Pink Floyd', () => {
    const response = commands.execute('add "The Dark Side of the Moon" "Pink Floyd"');
    assert.equal(response, 'Added "The Dark Side of the Moon" by Pink Floyd');
  });

  it('rejects empty album titles', () => {
    const response = commands.execute('add "  " "John Cage"');
    assert.equal(response, 'An album cannot have an empty title or artist');
  });

  it('rejects add command missing artist', () => {
    const response = commands.execute('add "Come On Pilgrim"');
    assert.equal(response, commands.invalidCommandRepsonse);
  });

  it('adds "Strange Weather, Isn\'t It?" by !!!', () => {
    const response = commands.execute('add "Strange Weather, Isn\'t It?" "!!!"');
    assert.equal(response, 'Added "Strange Weather, Isn\'t It?" by !!!');
  });
});

describe('play', () => {
  it('shows all before playing', () => {
    const response = commands.execute('show all');
    assert.equal(response, '"Ride the Lightning" by Metallica (unplayed)\n"Licensed to Ill" by Beastie Boys (unplayed)\n"Paul\'s Boutique" by Beastie Boys (unplayed)\n"The Dark Side of the Moon" by Pink Floyd (unplayed)\n"Strange Weather, Isn\'t It?" by !!! (unplayed)\n');
  });

  it('plays "Licensed to Ill"', () => {
    const response = commands.execute('play "Licensed to Ill"');
    assert.equal(response, 'You\'re listening to "Licensed to Ill"');
  });

  it('plays "The Dark Side of the Moon"', () => {
    const response = commands.execute('play "The Dark Side of the Moon"');
    assert.equal(response, 'You\'re listening to "The Dark Side of the Moon"');
  });

  it('does not play not existant album', () => {
    const response = commands.execute('play "The Darker Side of the Moon"');
    assert.equal(response, '"The Darker Side of the Moon" is not in your collection');
  });
});

describe('show', () => {
  it('shows all', () => {
    const response = commands.execute('show all');
    assert.equal(response, '"Ride the Lightning" by Metallica (unplayed)\n"Licensed to Ill" by Beastie Boys (played)\n"Paul\'s Boutique" by Beastie Boys (unplayed)\n"The Dark Side of the Moon" by Pink Floyd (played)\n"Strange Weather, Isn\'t It?" by !!! (unplayed)\n');
  });

  it('shows unplayed', () => {
    const response = commands.execute('show unplayed');
    assert.equal(response, '"Ride the Lightning" by Metallica (unplayed)\n"Paul\'s Boutique" by Beastie Boys (unplayed)\n"Strange Weather, Isn\'t It?" by !!! (unplayed)\n');
  });

  it('shows all by artist', () => {
    const response = commands.execute('show all by "Metallica"');
    assert.equal(response, '"Ride the Lightning" by Metallica (unplayed)\n');
  });

  it('shows unplayed by artist', () => {
    const response = commands.execute('show unplayed by "Beastie Boys"');
    assert.equal(response, '"Paul\'s Boutique" by Beastie Boys (unplayed)\n');
  });

  it('handles invalid show option', () => {
    const response = commands.execute('show nothing');
    assert.equal(response, commands.invalidCommandRepsonse);
  });

  it('handles invalid show suboption', () => {
    const response = commands.execute('show all title "Metallica"');
    assert.equal(response, commands.invalidCommandRepsonse);
  });

  it('rejects show by with unquoted artist', () => {
    const response = commands.execute('show all by Zap Mama');
    assert.equal(response, commands.invalidCommandRepsonse);
  });

  it('handles show by non-existant artist', () => {
    const response = commands.execute('show all by "Steely Dan"');
    assert.equal(response, 'Nothing to show');
  });
});
