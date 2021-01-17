const OPERATORS = [ 'AND', 'OR', 'NOT', 'EQUAL', 'GREATER_THAN','LESS_THAN' ];
const REPLACING_SYMBOLS = ['A', 'O', 'N', 'E', 'G', 'L' ];
const SYMBOL_TO_OPERATORS = 
{
  'A': '&&',
  'O': '||',
  'N': '!==',
  'E': '===',
  'G': '>',
  'L' : '<',
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

  /**
   * convert queries like A(E(id, 'fisrt-post'), E(view, 100)) to A(key1, key2) 
   * G(views,100)to 'key1' where key1: views > 100
   * @param: modifedQuerey, i, keyName, count, keyValMap, symbol 
   */
  const extractAndStoreExpr = ({modifedQuerey, i, keyName, count, keyValMap, symbol}) => {
    let queryExp = modifedQuerey.substr(i + 1);
    queryExp = queryExp.substr(1, queryExp.indexOf(')') - 1);
    const keyVal = queryExp.split(',');
    if (keyVal && keyVal.length == 2) {
      const newKey = `${keyName}${count}`;
      const operator = SYMBOL_TO_OPERATORS[symbol];
      keyValMap[newKey] = `${keyVal[0]} ${operator} ${keyVal[1]}`;
      modifedQuerey = modifedQuerey.replace(`${symbol}(${queryExp})`, newKey);
      count += 1;
    }
    return { modifedQuerey, count };
  }
  /**
   * convert queries like N(key1) to key1 
   *  where key1: id !== 'first-post'
   * @param: modifedQuerey, keyValMap
   */
  const handleNOTOperator = (modifedQuerey, keyValMap) => {
    let i = 0;
    while (i < modifedQuerey.length) {
      const char = modifedQuerey[i];
        if (char === 'N') {
          let queryExp = modifedQuerey.substr(i + 1);
          queryExp = queryExp.substr(1, queryExp.indexOf(')') - 1);
          if(queryExp in keyValMap) {
            const originalExp = keyValMap[queryExp];
            // Not operation will only work with Equal expr. 
            const operands = originalExp.split(' === ');
            keyValMap[queryExp] = `${operands [0]} !== ${operands[1]}`;
            modifedQuerey = modifedQuerey.replace(`N(${queryExp})`, queryExp);
          }
        }
      i += 1;
    }
    return { modifedQuerey, keyValMap };
  };
  /**
   * Process single operators such as EQUALS, GREATER_THAN, LESS_THAN, NOT
   * @param {*} query 
   */
  const processSingleOperators = (query) => {
    const keyName = 'key';
    let count = 1;
    let keyValMap = {};
    let modifedQuerey = query;
    let i = 0;
    while (i < modifedQuerey.length) {
      const char = modifedQuerey[i];
      if (char === 'E' || char === 'G' || char === 'L') {
        ({ modifedQuerey, count } = extractAndStoreExpr({
          modifedQuerey,
          i,
          keyName,
          count,
          keyValMap,
          symbol: char,
        }));
      }
      i += 1;
    };
    // handle special case for NOT
     ({ modifedQuerey, keyValMap } = handleNOTOperator(modifedQuerey, keyValMap));
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
        } = processSingleOperators(modifiedQueryStr);

        const infixQueryExpression = convertPrefixToInfix(modifedQuerey, keyValMap);
        return infixQueryExpression;
      }  
    } catch (error) {
      console.log(`error has occurred: ${error}`);
      return '';
    }
  }
  module.exports =  { parseQueryString };


