// Node is the type of items in a Stack. Node contains a value of any type and 
// a reference to the value which it sits above 
function Node(val) {
	this.value = val
	this.next = null
}

// Stack is a "first in last out" data structure. It maintains a reference to a bottom Node,
// a Top Node, and a length value which provides the length of the data structure.
function Stack(val) {
	const n = new Node(val)
	this.top = n
	this.bottom = n 
	this.size = 1
}

// push will add a new top Node and "push" the rest of the stack down
// When `pop` is called the most recently pushed item is returned and
// removed from the stack
Stack.prototype.push = function(val) {
	const n = new Node(val)
	n.next = this.top
	this.top = n
	if (this.size === 0) {
		this.bottom = n
	}
	this.size++
	return this
}

// pop returns the most recently pushed node and removes it from the stack 
Stack.prototype.pop = function() {
	if (!this.top) {
		return null
	}
	// Ensure that we don't leave any stray memory pointers around after
	// we were supposed to remove the bottom from the stack
	if (this.top === this.bottom) {
		this.bottom = null
	}
	const n = this.top
	this.top = this.top.next
	this.size--
	return n
}

// peek shows the top element of the stack
Stack.prototype.peek = function() {
	console.log(this.top.value)
}

// print prints out useful visual information for the stack
Stack.prototype.print = function() {
	let msg = ''
	let n = this.top
	while(n) {
		msg += `${n.value}\n|\nv\n`
		n = n.next
	}
	msg += 'NULL'
	console.log(msg)
	console.log(`top: ${this.top.value}`);
	console.log(`bottom: ${this.bottom.value}`);
	console.log(`size: ${this.size}`);
}

const s = new Stack(1)
s.push(2)
s.push(3)
s.push(4)
s.push(5)
s.print()

const n = s.pop()
console.log(n.value);

