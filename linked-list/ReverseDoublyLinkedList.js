const Node = require('./Node.js')
const DoublyLinkedList = require('./DoublyLinkedList.js')

function reverseTest() {
	// Create DoublyLinkedList with a single node whose head 
	// and tail (it being a single node and all) is 1
	const dll = new DoublyLinkedList(1)
	
	// Append 2,3,4 to the DoublyLinkedList
	dll.append(2)
	dll.append(3)
	dll.append(4)
	
	// Print the data structure, reverse it, then print it again
	dll.print()
	dll.reverse()
	dll.print()
}

reverseTest()