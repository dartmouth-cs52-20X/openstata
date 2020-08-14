import React from 'react';
// include the nearley library to parse
import nearley from 'nearley';
// import the grammar schema file
import RegGrammar from './regression-grammar';

const ExampleParsingComponent = (props) => {
  // each time the user wants to compile, we need to call a new constructor to have it forget earlier runs
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(RegGrammar));
  try {
    // feed it some input
    parser.feed('reg y x1 x2 if occupation == "teacher"');
    // results[0] is the first (and typically only) compiled match that we end up sending to the server eventually
    return <h1>{parser.results[0]}</h1>;
  } catch (error) {
    // errors will be thrown for syntax errors, take a look and think about how much we want to play with it
    // the first few lines are nice and pretty but there's a lot of junk too
    // should be incorporated somehow into visual feedback eventually
    console.log(error);
    return <h1>check the console, you got an error!</h1>;
  }
};

export default ExampleParsingComponent;
