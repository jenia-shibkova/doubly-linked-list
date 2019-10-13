const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        const newNode = new Node(data);

        if (this.length === 0) {
            this._head = newNode;
            this._tail = newNode;
        } else {                      
            this._tail.next = newNode;
            newNode.prev = newNode;  

            this._tail = newNode;
        }

        this.length++;
    }

    head() {
        return (this.length > 0) ? this._head.data : null;
    }

    tail() {
        return (this.length > 0) ? this._tail.data : null;
    }

    at(index) {
        if (index < 0 || this.length <= index) {
            return null;
        }

        let current = this._head;
        let pos = 0;

        while (pos < index) {
            current = current.next;
            pos++;
        }
        
        return current.data;
    }

    insertAt(index, data) {
        if (index < 0 || this.length < index) {
            return false;
        }

        let node = new Node(data);

        if (index === 0) {
            node.next = this._head;
            this._head.prev = node;

            this._head = node;
        } else if (index === this.length) {
            this._tail.next = node;
            node.prev = this._tail;

            this._tail = node;
        } else {
            let current = this._head;
            let prev = null;
            let pos = 0;

            while (pos < index) {
                prev = current;
                current = current.next;
                pos++;
            }

            prev.next = node;
            node.prev = prev;

            node.next = current;
            current.prev = node;
        }

        this.length++;
    }

    isEmpty() {
        return (this.length === 0) ? true : false;
    }

    clear() {   
        this._head = null;
        this._tail = null;
        this.length = 0;
         
        return this;
    }

    deleteAt(index) {
        if (index < 0 || this.length <= index ) {
            return null;
        }
      
        let current;
    
        if (index === 0) {
            current = this._head;
    
            this._head = this.head.next;
            this._head.prev = null;
        } else if (index === this.length - 1) {
            current = this._tail;

            this._tail = this._tail.prev;
            this._tail.next = null;
        } else {
            current = this._head;

            let prev = null;
            let pos = 0;
        
            while (pos < index) {
                prev = current;
                current = current.next;
                pos++;
            }
      
              prev.next = current.next;
              current.next.prev = prev;
        }
      
        this.length--;
    }

    reverse() {
        let current = this._head;
        let prev = null;

        while (current){
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }

        this._tail = this._head;
        this._head = prev;
    }

    indexOf(data) {
        let current = this._head;
        let index = 0;

        while (current) {
            if (current.data === data) {
                return index;
            }

            current = current.next;
            index++;
        }

        return -1;
    }
}

module.exports = LinkedList;
