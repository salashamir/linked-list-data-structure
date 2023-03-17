/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** private emthod to retrieve node at index */

  _get(idx) {
    let curr = this.head;
    let count = 0;

    while (curr !== null && count !== idx) {
      count += 1;
      curr = curr.next;
    }

    return curr;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    // create a new node with the received value
    const node = new Node(val);

    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    // create new node
    const node = new Node(val);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    if (this.length === 0) this.tail = this.head;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getValAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }
    // get the node at the idx
    const node = this._get(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // index oit of range
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case, index is 0
    if (idx === 0) {
      return this.unshift(val);
    }

    // special case, index is length
    if (idx === this.length) {
      return this.push(val);
    }

    const newNode = new Node(val);
    let prev = this._get(idx - 1);

    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // index oit of range
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // index is first item
    if (idx === 0) {
      const val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    const prev = this._get(idx - 1);

    // index is last item
    if (idx === this.length - 1) {
      const val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.head === null) return 0;

    let sum = 0;
    let curr = this.head;

    while (curr !== null) {
      sum += curr.val;
      curr = curr.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
