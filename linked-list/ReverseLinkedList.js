const LinkedList = require('./LinkedList.js')

function reverseTest() {
	// Create DoublyLinkedList with a single node whose head 
	// and tail (it being a single node and all) is 1
	const ll = new LinkedList(1)
	
	// Append 2,3,4 to the DoublyLinkedList
	ll.append(2)
	ll.append(3)
	ll.append(4)
	
	// Print the data structure, reverse it, then print it again
	ll.print()
	ll.reverse()
	ll.print()
}

reverseTest()