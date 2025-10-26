#!/usr/bin/node

function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = parseInt(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const res = [];

  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i]);
      i += 1;
    } else {
      res.push(right[j]);
      j += 1;
    }
  }

  return [...res, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));