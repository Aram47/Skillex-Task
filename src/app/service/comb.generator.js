function getPrefix(index) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let prefix = '';
  do {
    prefix = alphabet[index % 26] + prefix;
    index = Math.floor(index / 26) - 1;
  } while (index >= 0);
  return prefix;
}

function generateGroups(counts) {
  return counts.map((count, i) => {
    const prefix = getPrefix(i);
    return Array.from({ length: count }, (_, j) => `${prefix}${j + 1}`);
  });
}

function getCombinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const result = [];

  for (let i = 0; i <= arr.length - k; i++) {
    const head = arr[i];
    const tailCombs = getCombinations(arr.slice(i + 1), k - 1);
    for (const comb of tailCombs) {
      result.push([head].concat(comb));
    }
  }

  return result;
}

function cartesianProduct(groups) {
  return groups.reduce((acc, group) => {
    const result = [];
    for (const accItem of acc) {
      for (const item of group) {
        result.push(accItem.concat(item));
      }
    }
    return result;
  }, [[]]);
}

export default function generateValidCombinations(itemCounts, length) {
  const groups = generateGroups(itemCounts);
  const groupCombos = getCombinations(groups, length);
  const combinations = [];

  for (const groupSet of groupCombos) {
    combinations.push(...cartesianProduct(groupSet));
  }

  return { 
    combinations, 
    flatItems: groups.flat() 
  };
}