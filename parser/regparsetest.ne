@{%

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

%}

# the first grammar instruction is the 'main' top-level instruction
# this implementation only does single line commands
command -> regression {% (data) => composeRegression(data[0]) %}
		| "test" # more rules can just be tacked on with a pipe char

# pipe since regression can happen either with or w/o an if condition
regression -> _regression {% id %}
            | _regression __ condition {% ([[yvar, xArray],, cond]) => [yvar, xArray, cond] %}

# actual reg syntax here
_regression -> "reg" __ var multivar {% ([,, yvar, xArray]) => [yvar, xArray] %}

# potental multiple indep vars
multivar -> (__ var):+ null {% (data,_,reject) => {
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
%}

# single var
var -> [\w]:+ {% (data) =>  data[0].join('') %}

# if statement's form
condition -> "if" __ exp {% (data) => data[2] %}

# directly translates a condition to python without parsing, using regex
exp -> [\S] sstrchar:* null {% (data) => cleanExpression(data[0] + data[1].join('')) %}


# Whitespace
_ -> null | _ [ \t] {% () => null %}
__ -> [ \t] | __ [ \t] {% () => null %}
___ -> null | ___ [\s]  {% () => null %}
newl -> [\n\r] | newl [\n\r] {% () => null %}

# unused old stuff
#_regression -> "reg" __ var __ var {% ([,, yvar,,xvar]) => [yvar, xvar] %}ewl -> [\n\r] | newl [\n\r] {% () => null %}

# builtin
sstrchar -> [^\\'\n] {% id %}
    | "\\" strescape
        {% function(d) { return JSON.parse("\""+d.join("")+"\""); } %}
    | "\\'"
        {% function(d) {return "'"; } %}

strescape -> ["\\/bfnrt] {% id %}
    | "u" [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] {%
    function(d) {
        return d.join("");
    }
%}
