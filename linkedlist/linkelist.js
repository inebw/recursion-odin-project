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
      if (curr.val == val) return i;
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
