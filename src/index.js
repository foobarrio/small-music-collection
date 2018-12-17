const readline = require('readline');
const commands = require('./commands');

const rl = readline.createInterface({
  completer: commands.completer,
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to your music collection!'); // eslint-disable-line no-console

rl.prompt();

rl.on('line', (line) => {
  const trimmedLine = line.trim();

  if (trimmedLine === 'quit') {
    process.exit(0);
  } else {
    const response = commands.execute(trimmedLine);
    console.log(response); // eslint-disable-line no-console
  }

  rl.prompt();
});
