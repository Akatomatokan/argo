class Node {
  constructor(id, char) {
    this.id = id;
    this.char = char;
    this.children = {};
    this.fail = null;
    this.output = [];
    this.x = 0;
    this.y = 0;
  }
}

class AhoCorasick {
  constructor() {
    this.root = new Node(0, '');
    this.nodeCount = 1;
    this.nodes = [this.root];
  }

  addKeyword(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        const newNode = new Node(this.nodeCount++, ch);
        node.children[ch] = newNode;
        this.nodes.push(newNode);
      }
      node = node.children[ch];
    }
    node.output.push(word);
  }

  buildFailLinks() {
    const queue = [];
    for (const child of Object.values(this.root.children)) {
      child.fail = this.root;
      queue.push(child);
    }

    while (queue.length > 0) {
      const current = queue.shift();
      for (const [ch, child] of Object.entries(current.children)) {
        let f = current.fail;
        while (f && !f.children[ch]) f = f.fail;
        child.fail = f ? f.children[ch] : this.root;
        child.output = [...child.output, ...child.fail.output];
        queue.push(child);
      }
    }
  }
}
