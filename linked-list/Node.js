// Node is an entry in a Linked List
// We use the same object for double and singly linked lists, but in singly
// linked list we never set prev
function Node(value, next, prev) {
	this.value = value
	this.next = next
	this.prev = prev
}

module.exports = Node