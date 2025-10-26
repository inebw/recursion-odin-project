#!/usr/bin/node

let first = 0;
let second = 1;
const res = [];

function fibs(num) {
  for (let i = 0; i < num; i += 1) {
    if (i < 2) res.push(i);
    else {
      const temp = first + second;
      first = second;
      second = temp;
      res.push(second);
    }
  }

  return res;
}

function fibsrec(num) {
  if (num == 1) return [0]
  if (num == 2) return [0, 1]
  const res = fibsrec(num-1)
  return [...res, res[res.length-1] + res[res.length-2] ]

}

console.log(fibsrec(8));
