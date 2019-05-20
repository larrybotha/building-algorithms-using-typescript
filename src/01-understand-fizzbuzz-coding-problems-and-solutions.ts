/*
 * Write a program that prints integers from 1 to 100 (inclusive):
 *
 * - for multiples of 3, print fizz
 * - for multiples of five, print buzz
 * - for multiples of both 3 and 5, print fizzbuzz
 */

for (let i = 0; i <= 100; i++) {
  const fizz = i % 3 === 0 ? 'fizz' : '';
  const buzz = i % 5 === 0 ? 'buzz' : '';

  console.log([fizz, buzz].filter(Boolean).join('') || i)
}
