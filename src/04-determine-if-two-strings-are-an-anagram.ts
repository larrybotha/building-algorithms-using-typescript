const str1 = "madam";
const str2 = "adamm";

type AreAnagrams = (s1: string, s2: string) => boolean;

// O(n logn) complexity, beacuse we're using sort
const areAnagrams1: AreAnagrams = (s1, s2) => {
  const [sorted1, sorted2] = [s1, s2]
    .map(s => s.toLocaleLowerCase())
    .map(s => s.split('').sort().join(''))

  return sorted1 === sorted2;
}

// O(n). n is the number of characters in the strings
const areAnagrams2: AreAnagrams = (s1, s2) => {
  const charCount = new Map<string, number>();

  s1.split('')
    .map(c => charCount.set(c, (charCount.get(c) || 0) + 1));
  s2.split('')
    .filter(c => charCount.has(c))
    .map(c => charCount.set(c, charCount.get(c) - 1));

  return Array.from(charCount.values()).every(v => v === 0);
}

console.log(areAnagrams2(str1, str2));

export {areAnagrams1, areAnagrams2}
