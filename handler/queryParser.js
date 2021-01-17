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

module.exports = () => {
  const repalceAllOps = (query) => {
    let modifedQuerey = query;
    /**************************************************************************************
     * For simplicity, converting all operators to single character
     * AND(EQUAL(id,'first-post'),EQUAL(views,100)) => A(E(id, 'fisrt-post'), E(view, 100))
     **************************************************************************************/
    OPERATORS.forEach((op, index) => {
      modifedQuerey= modifedQuerey.replaceAll(op, REPLACING_SYMBOLS[index]);
    })
    return modifedQuerey;
  }

  const processEquals = (query) => {
    const keyName = 'key';
    const count = 1;
    const keyValMap = {};
    let modifedQuerey = query;
    /***
     * convert this query A(E(id, 'fisrt-post'), E(view, 100))
     * to A(key1, key2)
     *  */ 
    query.forEach((char, index) => {
      if (char === 'E') {
        let equalExp = query.subStrings(index+1);
        equalExp = equalExp.subStrings(0, equalExp.indexOf(')')-1);
        const keyVal = equalExp.split(',');
        if(keyVal && keyVal.lengh == 2) {
          const newKey = `${keyName}${count}`;
          keyValMap[newKey] = `${keyVal[0]} = ${keyVal[1]}`
          modifedQuerey.replace(`E(${equalExp})`, newKey);
          count += 1
        }
      }
    });
    // replace all ( ) , with spaces, so new prefix expression is: A key1  key 2
    modifedQuerey = modifedQuerey.replaceAll('(', ' ').replaceAll(')', ' ').replaceAll(',', '');
    return { modifedQuerey, keyValMap };
  }

  const convertPrefixToInfix = (modifedQuerey, keyValMap) => {
    let
    response = '',
    operators = [],
    operands = [];

  // Divide modifedQuerey into two arrays, operators and operands
  operators = modifedQuerey.split(' ').filter(function(o) {
    if (REPLACING_SYMBOLS.includes(o)) {
      return SYMBOL_TO_OPERATORS[o];
    } else {
      operands.push(keyValMap[o]);
    }
  });

  // Merge arrays
  for (let i = 0; i < operands.length; i++) {
    if (operators[i]) {
      response += operands[i] + ' ' + operators[i] + ' ';
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
        const modifiedQueryStr = repalceAllOps(query);
        const {
          modifedQuerey,
          keyValMap
        } = processEquals(modifiedQueryStr);

        const infixQueryExpression = convertPrefixToInfix(modifedQuerey, keyValMap);
        return infixQueryExpression;
      }  
    } catch (error) {
      return '';
    }
  }
  return { parseQueryString };
}