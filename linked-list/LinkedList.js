const Node = require('./Node.js')

// LinkedList is a data structure in which each element 
// maintains a reference to a next element 
function LinkedList(v) {
	const n = new Node(v)
	this.head = n
	this.tail = n
	this.length = 1
}

// append will set a new node to the tail and increment 
// the list length
LinkedList.prototype.append = function(v) {
	const n = new Node(v)
	this.tail.next = n
	this.tail = n 
	this.length++
	return this
}

// prepend will add a new node to the head and increment 
// the list length 
LinkedList.prototype.prepend = function(v) {
	const n = new Node(v)
	n.next = this.head
	this.head = n 
	this.length++
}

// insert will insert a new node into the LinkedList at a specified index
LinkedList.prototype.insert = function(index, v) {
	const n = new Node(v)

	const leader = this.findNodeByIndex(index)
	const follower = leader.next
	leader.next = n
	n.next = follower
	
	this.length++
	return this
}

// remove will remove a node from the LinkedList and ensure that 
// the nodes maintain sensible reference to other nodes
LinkedList.prototype.remove = function(index) {
	const leader = this.findNodeByIndex(index)
	const nodeToRemove = leader.next

	if (index === 0) {
		console.log('index to remove is 0 replacing head')
		this.head = this.head.next
	} 

	if (index >= this.length) {
		console.log('index is greater than or equal to this.length replacing tail')
		leader.next = null
		this.tail = leader
	}

	leader.next = nodeToRemove.next

	this.length--
	return this
}

// reverse will reverse a linked list
LinkedList.prototype.reverse = function() {
	// if the length of the list is one then the list is already virtually reversed
	if (this.length === 1) {
		return this 
	}

	// set the leader node to the current head
	let leader = this.head 
	// set the follower node to refer to leader's next property
	let follower = leader.next
	// set the LinkedList tail property to leader
	this.tail = leader
	// while follower is truthy continue looping
	while (follower) {
		// grab a reference to follower.next or leader.next.next
		const temp = follower.next
		// print out the current set up (used for debugging)
		const printableTemp = temp ? temp.value : 'END'
		console.log(`leader: ${leader.value} follower: ${follower.value} temp: ${printableTemp}`)

		// set the follower node's next property to the leader node
		// just for continuity at this point leader points to follower,
		// and follower points to leader and nothing points to temp  
		follower.next = leader
		// set leader to follower (used in next iteration)
		leader = follower
		// set follower to temp
		follower = temp
	}

	// set LinkedList's head.next property to null 
	// recall head and tail are the same right now
	this.head.next = null
	// reset the LinkedList's head property to point at current leader
	// recall this was previously the tail 
	this.head = leader

	// return this
	return this
}

// findNodeByIndex will traverse the LinkedList up to the index specified
// and return the Node found there 
LinkedList.prototype.findNodeByIndex = function(index) {
	if (ll.length <= index) {
		console.error('index out of bounds')
		return null
	}

	let times = 0
	let curNode = this.head
	while(curNode) {
		if (times === index) {
			return curNode
		}
		curNode = curNode.next
		times++
	}
}

// print will provides helpful visualizations for the LinkedList
LinkedList.prototype.print = function() {
	let curNode = this.head
	let printableList = ''
	while(curNode) {
		const printableNext = curNode.next ? curNode.next.value : 'END'
		printableList += `${curNode.value} (${printableNext}) -> `
		curNode = curNode.next
	}
	printableList += `END`
	console.log(printableList)
	console.log(`HEAD: ${this.head.value}`)
	console.log(`TAIL: ${this.tail.value}`)
}

const ll = new LinkedList(1)
ll.append(3)
ll.prepend(0)
ll.insert(1,2)
ll.remove(1)
ll.insert(1,2)
ll.append(4)
ll.print()

// reverse 
ll.reverse()
ll.print()