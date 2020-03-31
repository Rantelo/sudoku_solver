

export function findSolution(original) {
  let solution = [...original];

  let prev;
  // cycle until next solution is is same as current

  while (!areEqual(prev, solution)) {
  // 1. store prev solution
    prev = [...solution];
  // 2. replace 0s with arrays of possibles
    solution = zerosToArrays(solution);
  // 3. replace arrays of length==1 with content
  // 4. replaces possibles with 0
    solution = arraysToZeros(solution);
  }
  return solution;
}

function areEqual(prev, curr) {
  return ( JSON.stringify(prev) === JSON.stringify(curr) );
}

function zerosToArrays(arr) {
  return arr.map((row, rIdx) => row.map((col, cIdx) =>
    (col === 0) ? getSuggestions(arr, rIdx, cIdx) : col
  ));
}
function arraysToZeros(arr) {
  return arr.map((row, rIdx) => row.map((_col, cIdx) => {
    if (arr[rIdx][cIdx] instanceof Array) {
      return (arr[rIdx][cIdx].length === 1) ? arr[rIdx][cIdx][0] : 0;
    }
    return arr[rIdx][cIdx];
  }));
}


function getSuggestions(arr, row, col) {
  const suggestions = [];
  for (let i = 1; i < 10; i++) {
    if (
      !inRow(i, arr, row) &&
      !inCol(i, arr, col) &&
      !inBox(i, arr, row, col)
    ) suggestions.push(i);
  }
  return suggestions;
}

function inRow(num, arr, row) {
  return arr[row].includes(num);
}

function inCol(num, arr, col) {
  return arr.map(e => e[col]).includes(num);
}

function inBox(num, arr, row, col) {
  const iStart = Math.floor(row/3) * 3;
  const jStart = Math.floor(col/3) * 3;
  const box = [];
  for (let i = iStart; i <= iStart + 2; i++) {
    for (let j = jStart; j <= jStart + 2; j++) {
      if (arr[i][j] !== 0 && typeof arr[i][j] === 'number')
        box.push(arr[i][j]);
    }
  }
  return box.includes(num);
}