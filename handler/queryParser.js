const OPERATORS = [ 'AND', 'OR', 'NOT', 'EQUAL', 'GREATER_THAN','LESS_THAN' ];
const REPLACING_SYMBOLS = ['A', 'O', 'N', 'E', 'G', 'L' ];
const SYMBOL_TO_OPERATORS = 
{
  'A': 'AND',
  'O': 'OR',
  'N': 'NOT',
  'E': 'EQUAL',
  'G': 'GREATER_THAN',
  'L' : 'LESS_THAN',
};

  const repalceOpsWithSymbols = (query) => {
    let modifedQuerey = query;
    /**************************************************************************************
     * For simplicity, converting all operators to single character
     * AND(EQUAL(id,'first-post'),EQUAL(views,100)) => A(E(id, 'fisrt-post'), E(view, 100))
     **************************************************************************************/
    OPERATORS.forEach((op, index) => {
      const regx = new RegExp(op, 'g');
      modifedQuerey = modifedQuerey.replace(regx, REPLACING_SYMBOLS[index]);
    })
    return modifedQuerey;
  }

  const processEquals = (query) => {
    const keyName = 'key';
    let count = 1;
    const keyValMap = {};
    let modifedQuerey = query;
    /***
     * convert this query A(E(id, 'fisrt-post'), E(view, 100))
     * to A(key1, key2)
     *  */ 
    let i = 0;
    while (i < modifedQuerey.length) {
      const char = modifedQuerey[i];
      if (char === 'E') {
        let equalExp = modifedQuerey.substr(i+1);
        equalExp = equalExp.substr(1, equalExp.indexOf(')')-1);
        const keyVal = equalExp.split(',');
        if(keyVal && keyVal.length == 2) {
          const newKey = `${keyName}${count}`;
          keyValMap[newKey] = `${keyVal[0]} = ${keyVal[1]}`
          modifedQuerey = modifedQuerey.replace(`E(${equalExp})`, newKey);
          count += 1
        }
      }
      i += 1;
    };
    // replace all ( ) , with spaces, so new prefix expression is: A key1  key 2
    modifedQuerey = modifedQuerey
      .replace(/\(/g, ' ')
      .replace(/\)/g, ' ')
      .replace(/\,/g, ' ');
    return { modifedQuerey, keyValMap };
  }

  const convertPrefixToInfix = (modifedQuerey, keyValMap) => {
    let
    response = '',
    operators = [],
    operands = [];

  // Divide modifedQuerey into two arrays, operators and operands
  operators = modifedQuerey.split(' ').filter(function(op) {
    if (REPLACING_SYMBOLS.includes(op)) {
      return op;
    } else {
      if (op in keyValMap) {
        operands.push(keyValMap[op]);
      }

    }
  });

  // Merge arrays
  for (let i = 0; i < operands.length; i++) {
    if (operators[i]) {
      response += operands[i] + ' ' + SYMBOL_TO_OPERATORS[operators[i]] + ' ';
    } else {
      response =
        response + operands[i] + ' ';
    }
  }
  response = response.slice(0, -1);
  return response;
  }

  const parseQueryString = (query) => {
    try {
      if (query) {
        const modifiedQueryStr = repalceOpsWithSymbols(query);
        const {
          modifedQuerey,
          keyValMap
        } = processEquals(modifiedQueryStr);

        const infixQueryExpression = convertPrefixToInfix(modifedQuerey, keyValMap);
        return infixQueryExpression;
      }  
    } catch (error) {
      console.log(`error has occurred: ${error}`);
      return '';
    }
  }
  module.exports =  { parseQueryString };
