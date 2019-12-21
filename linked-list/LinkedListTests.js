const LinkedList = require('./LinkedList.js')

function removeNodeAtEndDoesNotExplode(){
	console.log('removeNodeAtEndDoesNotExplode -->\n')
	const ll = new LinkedList(1)
	ll.append(2)
	ll.append(3)
	ll.append(4)
	ll.remove(3)
	ll.print()
}

function removeNodeAtBeginDoesNotExplode(){
	console.log('removeNodeAtBeginDoesNotExplode -->\n')
	const ll = new LinkedList(1)
	ll.append(2)
	ll.append(3)
	ll.append(4)
	ll.remove(0)
	ll.print()
}

function removeNodeInMiddleDoesNotExplode(){
	console.log('removeNodeInMiddleDoesNotExplode -->\n')
	const ll = new LinkedList(1)
	ll.append(2)
	ll.append(3)
	ll.append(4)
	ll.remove(1)
	ll.print()
}

removeNodeAtEndDoesNotExplode()
removeNodeAtBeginDoesNotExplode()
removeNodeInMiddleDoesNotExplode()