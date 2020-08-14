import React from 'react';
import nearley from 'nearley';
import RegGrammar from './regression-grammar';

const ExampleParsingComponent = (props) => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(RegGrammar));
  try {
    parser.feed('reg y x1 x2 if occupation == "teacher"');
    return <h1>{parser.results[0]}</h1>;
  } catch (error) {
    console.log(error);
    return <h1>check the console, you got an error!</h1>;
  }
};

export default ExampleParsingComponent;
