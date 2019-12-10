const Node = require('./Node.js')
const DoublyLinkedList = require('./DoublyLinkedList.js')

function reverseTest() {
	// Create DoublyLinkedList with a single node whose head 
	// and tail (it being a single node and all) is 1
	const dll = new DoublyLinkedList(new Node(1,null))
	
	// Append 2,3,4 to the DoublyLinkedList
	dll.append(new Node(2, null))
	dll.append(new Node(3, null))
	dll.append(new Node(4, null))
	
	// Print the data structure, reverse it, then print it again
	dll.print()
	dll.reverse()
	dll.print()
}

reverseTest()