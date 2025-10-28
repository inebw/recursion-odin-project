class LinkedList {
  constructor() {
    this.dummy = new Node();
    this.tail = null;
    this.dummy.next = this.tail;
    this.size = 0;
  }

  append(val) {
    this.size += 1;
    const newNode = new Node(val);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.dummy.next = newNode;
    }
    this.tail = newNode;
  }

  prepend(val) {
    this.size += 1;
    const newNode = new Node(val);
    if (this.dummy.next) newNode.next = this.dummy.next;
    else this.tail = newNode;
    this.dummy.next = newNode;
  }

  get head() {
    return this.dummy.next;
  }

  at(index) {
    let curr = this.head;
    let i = 0;
    while (curr) {
      if (index === i) return curr;
      curr = curr.next;
      i += 1;
    }
    return null;
  }

  pop() {
    let curr = this.dummy;
    while (curr) {
      if (curr.next === this.tail) {
        this.size -= 1;
        curr.next = null;
        this.tail = curr;
        return;
      }
      curr = curr.next;
    }
  }

  contains(val) {
    let curr = this.head;
    while (curr) {
      if (curr.val == val) return true;
      curr = curr.next;
    }
    return false;
  }

  find(val) {
    let curr = this.head;
    let i = 0;
    while (curr) {
      if (curr.val[0] == val) return i;
      curr = curr.next;
      i += 1;
    }
    return null;
  }

  toString() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `(${curr.val}) -> `;
      curr = curr.next;
    }
    res += "null";
    return res;
  }

  insertAt(val, index) {
    if (index === 0) this.prepend(val);
    else if (index === this.size) this.append(val);
    else {
      let curr = this.head;
      let i = 0;
      while (curr) {
        if (i === index - 1) {
          this.size += 1;
          const newNode = new Node(val);
          newNode.next = curr.next;
          curr.next = newNode;
        }
        i += 1;
        curr = curr.next;
      }
    }
  }

  removeAt(index) {
    if (index === this.size - 1) this.pop();
    else {
      let curr = this.dummy;
      let i = -1;
      while (curr) {
        if (i === index - 1) {
          curr.next = curr.next.next;
          this.size -= 1;
        }
        curr = curr.next;
        i += 1;
      }
    }
  }
}

class Node {
  constructor(val = null) {
    this.val = val;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.loafFactor = 0.75;
    this.baseCapacity = 16;
    this.capacity = 16;
    this.size = 0;
    this.hashTable = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  expandTable() {
    this.size = 0;
    const allEntries = this.entries();
    this.capacity *= 2;
    this.hashTable = [];
    for (let i = 0; i < allEntries.length; i += 1) {
      this.set(allEntries[i][0], allEntries[i][1]);
    }
  }

  set(key, value) {
    this.size += 1;
    const k = this.hash(key);
    if (!this.hashTable[k]) this.hashTable[k] = new LinkedList();
    const list = this.hashTable[k];
    const linkedListIndex = list.find(key);
    if (linkedListIndex !== undefined && linkedListIndex !== null) {
      list.removeAt(linkedListIndex);
      this.size -= 1;
    }
    list.prepend([key, value]);
    if (this.size > this.loafFactor * this.capacity) this.expandTable();
  }

  get(key) {
    const k = this.hash(key);

    if (!this.hashTable[k]) return null;
    const list = this.hashTable[k];

    const linkedListIndex = list.find(key);
    if (linkedListIndex === undefined) return null;

    return list.at(linkedListIndex).val[1];
  }

  has(key) {
    const k = this.hash(key);
    if (!this.hashTable[k]) return false;
    const list = this.hashTable[k];

    const linkedListIndex = list.find(key);
    if (linkedListIndex === undefined || linkedListIndex === null) return false;

    return true;
  }

  remove(key) {
    const k = this.hash(key);
    if (!this.hashTable[k]) return false;
    const list = this.hashTable[k];
    const linkedListIndex = list.find(key);
    if (linkedListIndex !== undefined && linkedListIndex !== null) {
      list.removeAt(linkedListIndex);
      this.size -= 1;
      return true;
    }
    return false;
  }

  length() {
    let totalLength = 0;
    this.hashTable.forEach((entry) => {
      {
        if (entry) totalLength += entry.size;
      }
    });
    return totalLength;
  }

  clear() {
    this.hashTable = [];
    this.capacity = this.baseCapacity;
  }

  keys() {
    const allKeys = [];
    this.hashTable.forEach((entry) => {
      if (entry) {
        let curr = entry.head;
        while (curr) {
          allKeys.push(curr.val[0]);
          curr = curr.next;
        }
      }
    });
    return allKeys;
  }

  values() {
    const allValues = [];
    this.hashTable.forEach((entry) => {
      if (entry) {
        let curr = entry.head;
        while (curr) {
          allValues.push(curr.val[1]);
          curr = curr.next;
        }
      }
    });
    return allValues;
  }

  entries() {
    const allEntries = [];
    this.hashTable.forEach((entry) => {
      if (entry) {
        let curr = entry.head;
        while (curr) {
          allEntries.push(curr.val);
          curr = curr.next;
        }
      }
    });
    return allEntries;
  }
}