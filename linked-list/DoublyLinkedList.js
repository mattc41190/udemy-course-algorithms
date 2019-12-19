const Node = require('./Node.js')

// A data structure in which each object maintains references 
// to a "next" object and "prev" (previous) object 
function DoublyLinkedList(v) {
	const n = new Node(v)
	this.head = n
	this.tail = n
	this.length = 1
}

// append adds a node to the end of the data structure
DoublyLinkedList.prototype.append = function(v) {
	const n = new Node(v)
	// Take the current tail value and provide a next value 
	// pointer on it. Now the (previously) current tail will 
	// have a reference to the new tail
	n.prev = this.tail
	this.tail.next = n
	// Reassign the current tail to be the new Node
	this.tail = n
	// Increment the length of the data structure
	this.length++	
	return this
}

// prepend adds a new Node to the beginning of the data structure 
DoublyLinkedList.prototype.prepend = function(v) {
	// Create new node with the value of our desired value and 
	// a next value of the current head.
	const n = new Node(v)
	n.next = this.head
	// Reassign "head" to be the new node. The reference to the value 
	// in the previous "head" object is reserved inside the "next" value 
	// of the new head. Additionally, the second item in the DLL now has
	// a prev pointer to the new head object.
	this.head.prev = n
	this.head = n
	// Increment the length of the data structure
	this.length++
	return this
}

// insert will insert a new node at the index specified
DoublyLinkedList.prototype.insert = function(index, v) {
	const n =  new Node(v)
	// If the value is invalid due to it being outside of the known 
	// boundaries of the data structure modify the value and append it
	if (index > this.length || index < 0) {
		console.error("out of bounds -- falling back to append creating new tail", index, this.length)
		return this.append(n)
	}

	// if index is zero pass the value of the new node to prepend which
	// will take care of manipulating the data structure's "head" property  
	if (index === 0) {
		console.error("index 0 -- falling back to prepend creating new head", index, this.length)
		return this.prepend(n.value)
	}

	// Get a reference to leader node:
	// Ex: Leader node, if the desired index was "2"
	// and data structure looked lke this: 11<->12<->13<->14
	// the "leader" node in this case would be the node with the value of 12
	// and the node at index "3" would be considered the follower. The goal
	// of insert is to place new node between the leader and the follower and
	// create the desired connection between them Ex: 11<->12<->99<->13<->14
	const leaderIndex = index - 1
	const leaderNode = this.findNodeAt(leaderIndex)
	const followerNode = leaderNode.next 

	// Perform the insertion by setting the leader to have next value of 
	// the new node and the the follower to have a prev value of new node
	// then set new node next to follower and new node prev to leader
	n.prev = leaderNode
	n.next = followerNode
	followerNode.prev = n
	leaderNode.next = n 

	// Increment length and return
	this.length++	
	return this
}

// delete removes a node a the specified index or "spot"
DoublyLinkedList.prototype.delete = function(spot) {
	// There are 3 possible options:

	// Option 1: We get a new tail if the number is set to anything at least this.length
	// In this case this.tail - 1 would be set as new tail. Then this newly set 
	// tail would currently maintain a ref to a node, so we would need to null that out
	if (spot >= this.length) {
		console.error("last index or out of bounds -- going to replace tail", spot, this.length)
 		// fixing possible accidents (for loops are zero init'd)
		spot = this.length - 1
		const leaderIndex = spot - 1
		const leaderNode = this.findNodeAt(leaderIndex)
		// Remove connection to current tail 
		leaderNode.next = null
		// Replace data structure's current tail with leader
		this.tail = leaderNode
		return this
	}

	// Option 2: We get a new head if the number is 0 
	// In this case current head would be orphaned, and this.head would
	// be set to current (dead) head's next
	if (spot === 0) {
		console.error("first index -- going to replace head", spot, this.length)
		this.head = this.head.next
		this.head.prev = null
		return this 
	}

	// Option 3: We insert into a non-head and non-tail value
	// In this case we traverse until we find the node, each time saving a reference 
	// to the previous node (`leaderNode`) once we find the node to delete we ask for its next value.
	// With this `next` value in hand we set the `leaderNode`'s next value to the value in 
	// the node to remove's next place. (This will likely also work in the head case), 
	// but this would not fix the the issue of replacing the head value
	const leaderIndex = spot - 1
	leaderNode = this.findNodeAt(leaderIndex)
	followerNode = leaderNode.next.next 
	leaderNode.next = followerNode 

	if (followerNode) {
		followerNode.prev = leaderNode
	}

	this.length--
	return this
}

// findNodeAt find a node at a particular index
DoublyLinkedList.prototype.findNodeAt = function(spot) {
	if (spot > this.length || spot < 0) {
		console.error("out of bounds", spot, this.length)
		return null
	}

	// set node under inspection to head node
	curNode = this.head
	for(let i = 0; i <= spot; i++) {
		if (i === spot) {
			return curNode
		}
		// reset node under inspection to the current node's next property
		curNode = curNode.next 
	} 
}

// findNodeWithValue return true or false depending on whether a node with the passed
// value exists in the data structure.
DoublyLinkedList.prototype.findNodeWithValue = function(value) {
	let curNode = this.head
	while(curNode) {
		if (curNode.value === value) {
			return true
		}
		curNode = curNode.next
	} 
	return false
}

// reverse reverses the DoublyLinkedList
// the entire process starts from the tail and iteratively 
// assigns the prev property to the next property and 
// the next property to the prev property and then moves 
// to the next node and repeats the process to the end 
// of the data structure and swap the head and tail when 
// the loop encounters them 
DoublyLinkedList.prototype.reverse = function() {
	// assign a node to the DoublyLinkedList's tail
	let curNode = this.tail
	// while the curNode is "truthy" continue
	while(curNode){
		// perform the "switch" assign the curNode's (1st pass `this.tail`)
		// prev property to the next pointer and the next property to 
		// the prev pointer
		const curPrev = curNode.prev 
		const curNext = curNode.next
		curNode.next = curPrev
		curNode.prev = curNext

		// if curNode's prev property (recall when we started 
		// this was the curNode's next property) is null then 
		// assign the DoublyLinkedList's head property to curNode
		if (curNode.prev === null) {
			this.head = curNode
		}

		// if curNode's next property (recall when we started 
		// this was curNode's prev property) is falsey then 
		// assign the DoublyLinkedList's tail property to curNode
		if (!curNode.next) {
			this.tail = curNode
		}

		// assign curNode to be curNode.next (recall, again that
		// that was curNode.prev when we started this loop iteration) 
		curNode = curNode.next
	}
	
	return this
}

// print provides useful visual information for the data structure.
DoublyLinkedList.prototype.print = function() {
	let s = ''
	let curNode = this.head
	while(true) {
		const nextVal = curNode.next ? curNode.next.value : null 
		const prevVal = curNode.prev ? curNode.prev.value : null 

		s += `${curNode.value} (${prevVal},${nextVal}) --> `
		curNode = curNode.next
		if(!curNode) {
			s += `END`
			console.log(s)
			console.log(`Head Node Value: ${this.head.value}`)
			console.log(`Tail Node Value: ${this.tail.value}`)
			return
		}
	}
}

module.exports = DoublyLinkedList