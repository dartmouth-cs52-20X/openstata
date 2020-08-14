/* eslint-disable */
// Generated automatically by nearley, version 2.19.5
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


// replaces a few stata syntax things to python
function cleanExpression(string) {
	return string
		.replace(/(!|~)(?![=])/g, ' not ')
		.replace(/~/g, '!')
		//.replace(/(&&|&)/g, ' and ')
		//.replace(/(\|\||\|)/g, ' or ')
		.replace(/\^/g, '**')
}

// puts together a reg statement
function composeRegression([yvar, xArray, cond]) {
	const condString = cond ? `\'${cond}\'` : 'None';
	const xvars = `[${xArray.map((xvar) => `'${xvar}'`).join()}]`
	return `regress('${yvar}', ${xvars}, ${condString})`
}

var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "command", "symbols": ["regression"], "postprocess": (data) => composeRegression(data[0])},
    {"name": "command$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"s"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "command", "symbols": ["command$string$1"]},
    {"name": "regression", "symbols": ["_regression"], "postprocess": id},
    {"name": "regression", "symbols": ["_regression", "__", "condition"], "postprocess": ([[yvar, xArray],, cond]) => [yvar, xArray, cond]},
    {"name": "_regression$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "_regression", "symbols": ["_regression$string$1", "__", "var", "multivar"], "postprocess": ([,, yvar, xArray]) => [yvar, xArray]},
    {"name": "multivar$ebnf$1$subexpression$1", "symbols": ["__", "var"]},
    {"name": "multivar$ebnf$1", "symbols": ["multivar$ebnf$1$subexpression$1"]},
    {"name": "multivar$ebnf$1$subexpression$2", "symbols": ["__", "var"]},
    {"name": "multivar$ebnf$1", "symbols": ["multivar$ebnf$1", "multivar$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "multivar", "symbols": ["multivar$ebnf$1"], "postprocess":  (data,_,reject) => {
        	try {
        		return data[0].map((item) => { 
        			if (item[1] === 'if') throw new Error();
        			return item[1];
        		})
        	} catch(e) {
        		// prunes the tree in case someone spams ifs to give us memory overflows
        		return reject;
        	}
        }
        },
    {"name": "var$ebnf$1", "symbols": [/[\w]/]},
    {"name": "var$ebnf$1", "symbols": ["var$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "var", "symbols": ["var$ebnf$1"], "postprocess": (data) =>  data[0].join('')},
    {"name": "condition$string$1", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "condition", "symbols": ["condition$string$1", "__", "exp"], "postprocess": (data) => data[2]},
    {"name": "exp$ebnf$1", "symbols": []},
    {"name": "exp$ebnf$1", "symbols": ["exp$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "exp", "symbols": [/[\S]/, "exp$ebnf$1"], "postprocess": (data) => cleanExpression(data[0] + data[1].join(''))},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": ["_", /[ \t]/], "postprocess": () => null},
    {"name": "__", "symbols": [/[ \t]/]},
    {"name": "__", "symbols": ["__", /[ \t]/], "postprocess": () => null},
    {"name": "___", "symbols": []},
    {"name": "___", "symbols": ["___", /[\s]/], "postprocess": () => null},
    {"name": "newl", "symbols": [/[\n\r]/]},
    {"name": "newl", "symbols": ["newl", /[\n\r]/], "postprocess": () => null},
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        }
]
  , ParserStart: "command"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
