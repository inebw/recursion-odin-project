class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArray = this.mergeSort(arr, 0, arr.length - 1);
    return this.buildTreeHelper(sortedArray, 0, sortedArray.length - 1);
  }

  buildTreeHelper(arr, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);

    const newNode = new Node(arr[mid]);
    newNode.left = this.buildTreeHelper(arr, start, mid - 1);
    newNode.right = this.buildTreeHelper(arr, mid + 1, end);

    return newNode;
  }

  mergeSort(arr, start, end) {
    if (start == end) return [arr[start]];

    const mid = parseInt((start + end) / 2);

    const left = this.mergeSort(arr, start, mid);
    const right = this.mergeSort(arr, mid + 1, end);

    const res = [];

    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] > right[j]) {
        res.push(right[j]);
        j += 1;
      } else if (left[i] < right[j]) {
        res.push(left[i]);
        i += 1;
      } else {
        res.push(left[i]);
        i += 1;
        j += 1;
      }
    }

    return [...res, ...left.slice(i), ...right.slice(j)];
  }

  insert(val) {
    const tempRoot = this.root;
    function helper(root) {
      if (val < root.val) {
        if (root.left) helper(root.left);
        else root.left = new Node(val);
      } else if (val > root.val) {
        if (root.right) helper(root.right);
        else root.right = new Node(val);
      } 
    }
    helper(tempRoot);
  }

  deleteItem(val) {
    if (!val) throw new Error("Etner a real value")
    this.root = this.deleteItemHelper(this.root, val);
  }

  findSuccessor(root) {
    let curr = root.right;

    while (curr && curr.left) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItemHelper(root, val) {
    if (!root) return null;

    if (root.val > val) root.left = this.deleteItemHelper(root.left, val);
    else if (root.val < val) root.right = this.deleteItemHelper(root.right, val);
    else {
      if (!root.left) return root.right;
      else if (!root.right) return root.left;

      const successor = this.findSuccessor(root);
      root.val = successor.val;
      root.right = this.deleteItemHelper(root.right, successor.val);
    }
    return root;
  }

  find(val) {
    const curr = this.root;
    function helper(root) {
      if (!root) return null;
      if (root.val === val) return root;
      if (root.val > val) return helper(root.left);
      return helper(root.right);
    }
    return helper(curr);
  }

  levelOrderForEach(cb) {
    if (cb === undefined) throw new Error("No callback function given");
    const queue = [this.root];
    while (queue.length > 0) {
      const curr = queue.shift();
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
      cb(curr.val);
    }
  }

  inOrderForEach(cb) {
    if (cb === undefined) throw new Error("No callback function given");
    const curr = this.root;
    function helper(root) {
      if (!root) return null;
      helper(root.left);
      cb(root.val);
      helper(root.right);
    }
    helper(curr);
  }

  preOrderForEach(cb) {
    if (cb === undefined) throw new Error("No callback function given");
    const curr = this.root;
    function helper(root) {
      if (!root) return null;
      cb(root.val);
      helper(root.left);

      helper(root.right);
    }
    helper(curr);
  }

  postOrderForEach(cb) {
    if (cb === undefined) throw new Error("No callback function given");
    const curr = this.root;
    function helper(root) {
      if (!root) return null;
      helper(root.left);
      helper(root.right);
      cb(root.val);
    }
    helper(curr);
  }

  height(val) {
    function helper(root) {
      if (!root) return -1;

      const leftHeight = helper(root.left);
      const rightHeight = helper(root.right);
      const maxChild = leftHeight > rightHeight ? leftHeight : rightHeight;

      return 1 + maxChild;
    }
    return helper(this.find(val));
  }

  depth(val) {
    function helper(root) {
      if (!root) return null;

      if (root.val == val) return 0;

      if (val > root.val) return 1 + helper(root.right);
      return 1 + helper(root.left);
    }
    return helper(this.root);
  }

  isBalanced() {
    let isTrue = true;
    function helper(root) {
      if (!root) return -1;

      const leftHeight = helper(root.left);
      const rightHeight = helper(root.right);
      const maxChild = leftHeight > rightHeight ? leftHeight : rightHeight;

      if (Math.abs(leftHeight - rightHeight) > 1) isTrue = false;
      return 1 + maxChild;
    }
    helper(this.root);
    return isTrue;
  }

  rebalance() {
    const sortedArray = [];
    function getInOrder(root) {
      if (!root) return;

      getInOrder(root.left);
      sortedArray.push(root.val);
      getInOrder(root.right);
    }
    getInOrder(this.root);
    this.root = this.buildTreeHelper(sortedArray, 0, sortedArray.length - 1);
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const a = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 87,
  86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68,
  67, 66, 65, 64, 63, 62, 61, 60,
];
const b = a.slice(0, 10);
const bst = new Tree(b);


prettyPrint(bst.root);
try {
  bst.deleteItem(5);
  bst.deleteItem(2);
  bst.deleteItem(6);
  bst.deleteItem(7);
  bst.deleteItem(8);
  bst.deleteItem(9);
  bst.deleteItem(10);
  bst.deleteItem(4);
  bst.deleteItem(1);
  bst.deleteItem(3);
} catch(err) {
  console.log(err)
}
prettyPrint(bst.root);
