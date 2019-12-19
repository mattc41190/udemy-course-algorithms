// Node is an entry in a Linked List
// We use the same object for double and singly linked lists, but in singly
// linked list we never set prev
function Node(value) {
	this.value = value
	this.next = null
	this.prev = null
}

module.exports = Node