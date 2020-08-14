const readline = require('readline');
const nearley = require('nearley');
const grammar = require('./reg-grammar');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('interpret some line!');

rl.on('line', (input) => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  try {
    parser.feed(input);
    console.log(parser.results[0]);
  } catch (error) {
    console.log(error);
  }
});
