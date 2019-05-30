const parseStringCheat = (s: string): number => {
  return parseInt(s);
};

console.log(parseStringCheat('123')); // => 123
console.log(parseStringCheat('-123')); // => -123
console.log(parseStringCheat('-123Extra')); // => -123
console.log(parseStringCheat('-123.456')); // => -123
console.log(parseStringCheat('does not start with digit 123')); // => NaN

/**
 * atoi
 *
 * parse a string for an integer value
 *
 * @param {string)} str - the string to parse
 * @returns {number}
 */
const atoi = (str: string): number => {
  /*
   * get the character code for 0
   *
   * THis will allow us to convert each digit from a string to its integer value
   */
  const zeroCode = '0'.charCodeAt(0);
  let sign = 1;
  let acc = 0;

  if (str[0] === '-') {
    str = str.substring(1);
    sign = -1;
  }

  for (const char of str) {
    /*
     * the distance between the code points of characters can be used to determine
     * the distance between those characters
     */
    const diff = char.charCodeAt(0) - zeroCode;

    /*
     * if the distance from 0 is greater than 10, or negative, we know we don't
     * have a digit
     */
    if (diff >= 10 || diff < 0) {
      break;
    }

    /*
     * acc * 10 demonstrates that digits represent powers of 10
     */
    acc = acc * 10 + diff;
  }

  return acc === 0 && str[0] !== '0' ? NaN : sign * acc;
};

console.log(atoi('123')); // => 123
console.log(atoi('-123')); // => -123
console.log(atoi('-123Extra')); // => -123
console.log(atoi('-123.456')); // => -123
console.log(atoi('does not start with digit 123')); // => NaN

export {atoi, parseStringCheat};
