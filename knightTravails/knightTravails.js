class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  // Insert item at the end — O(1)
  enqueue(item) {
    this.storage[this.rear] = item;
    this.rear++;
  }

  // Remove item from the front — O(1)
  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;
    return item;
  }

  // Peek front element — O(1)
  peek() {
    return this.isEmpty() ? null : this.storage[this.front];
  }

  // Check if queue is empty — O(1)
  isEmpty() {
    return this.rear === this.front;
  }

  // Get queue size — O(1)
  size() {
    return this.rear - this.front;
  }
}

function knightMoves(source, target) {
  const visited = new Set();
  const queue = new Queue();
  const adjList = {};
  queue.enqueue([source, null])

  while (!queue.isEmpty()) {
    const curr = queue.dequeue();
    const move = curr[0];
    const parentMove = curr[1];
    adjList[move] = parentMove
    visited.add(`${move[0]},${move[1]}`)

    if (move[0] == target[0] && move[1] == target[1]) {
        const res = []
        let tar = move
        while (tar) {
            res.push(tar)
            tar = adjList[tar]
        }
        console.log(`=> You made it in ${res.length - 1} moves! Here's your path:`)
        for (let i = res.length -1; i >= 0 ; i -= 1) 
            console.log(` -  [ ${res[i][0]}, ${res[i][1]} ]`)
        return
    }

    for (let rowcol of getPossibleMoves(move[0], move[1])) {
      const currMove = `${rowcol[0]},${rowcol[1]}`;
      if (!visited.has(currMove)) queue.enqueue([rowcol, move]);
    }
  }
}

function inBounds(x, y) {
  return !(x > 7 || x < 0 || y > 7 || y < 0);
}

function getPossibleMoves(x, y) {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, -1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
  ];
  const allMoves = [];
  for (let move of moves) {
    const currMove = [x + move[0], y + move[1]];
    if (inBounds(...currMove)) allMoves.push(currMove);
  }
  return allMoves;
}