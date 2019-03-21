const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    push(data, priority) {
        const newNode = new Node(data, priority);
        this.insertNode(newNode);
        this.shiftNodeUp(newNode);
        this.parentNodes = [];
        this.rebuildParentNodes(this.root);
        this.heapSize++;
    }

    pop() {
        if (!this.isEmpty()) {
            const popValue = this.detachRoot();
            this.restoreRootFromLastInsertedNode(popValue);
            this.shiftNodeDown(this.root);
            this.heapSize--;
            return popValue.data;
        } else {
            return;
        }
    }

    detachRoot() {
        const returnedValue = this.root;
        if (returnedValue === this.parentNodes[0]) {
            // this.root = null;
            //this.heapSize--;
            this.parentNodes.shift();
            //this.parentNodes = [];
        }
        this.root = null;

        return returnedValue;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.parentNodes.length > 0) {
            this.root = this.parentNodes[this.parentNodes.length - 1];
            if (this.root.parent === detached) {
                this.root.parent = null;
            } else {
                if (this.root.parent.left === this.root) {
                    this.root.parent.left = null;
                } else if (this.root.parent.right === this.root) {
                    this.root.parent.right = null;
                }
            }
            if (detached.left && detached.left !== this.root) {
                this.root.left = detached.left;
                this.root.left.parent = this.root;
            }

            if (detached.right && detached.right !== this.root) {
                this.root.right = detached.right;
                this.root.right.parent = this.root;
            }
            this.parentNodes = [];
            this.rebuildParentNodes(this.root);
        }
    }

    size() {
        return this.heapSize;
    }

    isEmpty() {
        return this.root === null;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    takePlace(parent, node) {
        if (!parent) {
            this.parentNodes[0] = node;
            this.root = node;
        } else if (!parent.left) {
            parent.left = node;
            node.parent = parent;
            this.parentNodes[this.parentNodes.length] = node;
        } else if (!parent.right) {
            parent.right = node;
            node.parent = parent;
            this.parentNodes[this.parentNodes.length] = node;
            this.parentNodes.shift();
        }
    }

    insertNode(node) {
        const parent = this.parentNodes[0];
        this.takePlace(parent, node);
    }

    rebuildParentNodes(parent) {
        if (parent) {
            if (!parent.parent && !(parent.left && parent.right)) {
                this.parentNodes.push(parent);
            }
            if (parent.left && !(parent.left.left && parent.left.right)) {

                this.parentNodes.push(parent.left)
            }
            if (parent.right && !(parent.right.left && parent.right.right)) {
                this.parentNodes.push(parent.right);
            }
            this.rebuildParentNodes(parent.left);
            this.rebuildParentNodes(parent.right);
        }

    }

    shiftNodeUp(node) {
        if (node.parent && (node.parent.priority < node.priority)) {
            node.swapWithParent();
            if (!node.parent) {
                this.root = node;
                this.parentNodes = [];
                this.rebuildParentNodes(this.root);
            }
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        if (node && node.left) {
            if (node.right && (node.right.priority > node.left.priority)) {
                if (node.right.priority > node.priority) {
                    if (!node.parent) {
                        this.root = node.right;
                    }
                    node.right.swapWithParent();
                }
            } else {
                if (node.left.priority > node.priority) {
                    if (!node.parent) {
                        this.root = node.left;
                    }
                    node.left.swapWithParent();
                } else {
                    return;
                }
            }
            if (!node.left && !node.right) {
                this.parentNodes = [];
                this.rebuildParentNodes(this.root);
            }
            this.shiftNodeDown(node);
        }
    }
}


module.exports = MaxHeap;
