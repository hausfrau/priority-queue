class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (!this.left) {
            this.left = node;
            node.parent = this;
        } else if (!this.right) {
            this.right = node;
            node.parent = this;
        }
    }

    removeChild(node) {
        if (node === this.left) {
            this.left.parent = null;
            this.left = null;
        } else if (node === this.right) {
            this.right.parent = null;
            this.right = null;
        } else {
            throw "Node is not a child of this node!";
        }
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
            this.left = null;
            this.right = null;
        }
    }

    swapWithParent() {
        if (this.parent) {
            if (this.parent.parent) {
                if (this.parent === this.parent.parent.right) {
                    this.parent.parent.right = this;
                } else if (this.parent === this.parent.parent.left) {
                    this.parent.parent.left = this;
                }
            }

            if (this.left) {
                this.left.parent = this.parent;
            }
            if (this.right) {
                this.right.parent = this.parent;
            }

            if (this === this.parent.right) {
                if (this.parent.left) {
                    this.parent.left.parent = this;
                }

                [this.left, this.parent.left] = [this.parent.left, this.left];
                this.parent.right = this.right;
                this.right = this.parent;

                const grand = this.parent.parent;
                this.parent.parent = this;
                this.parent = grand;
            } else if (this === this.parent.left) {
                if (this.parent.right) {
                    this.parent.right.parent = this;
                }

                [this.right, this.parent.right] = [this.parent.right, this.right];
                this.parent.left = this.left;
                this.left = this.parent;

                const grand = this.parent.parent;
                this.parent.parent = this;
                this.parent = grand;
            }

        }
    }
}


module.exports = Node;
