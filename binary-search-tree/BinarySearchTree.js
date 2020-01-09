function Node(value) {
	this.right = null
	this.left = null
	this.value = value
}

function BinarySearchTree() {
	this.root = null
}

// insert will insert a new node into a binary search tree
BinarySearchTree.prototype.insert = function(value) {
	// create new node
	const newNode =  new Node(value)
	
	// if the tree contains no nodes then this node is the root... congrats
	if (this.root == null) {
		this.root = newNode
		return
	}

	// prepare to traverse the tree
	let curNode = this.root

	// create infinite loop
	while(true) {

		// if the value of the node currently under inspection is greater
		// than the value passed in we continue our investigation here
		if(curNode.value > value) {
			if(curNode.left) {
				// if the node currently under inspection has a left child that
				// child is set to be the node under inspection and the investigation 
				// starts over again (restart loop with new node)
				curNode = curNode.left
				continue
			} else {
				// if the node under inspection has no left child then the newNode 
				// becomes the node under inspection's left child and function exits
				curNode.left = newNode
				return 
			}
		}

		// if the value of the node currently under inspection is less
		// than the value passed in we continue our investigation here
		if(curNode.value < value) {
			if(curNode.right) {
				// if the node currently under inspection has a right child that
				// child is set to be the node under inspection and the investigation 
				// starts over again (restart loop with new node)
				curNode = curNode.right
				continue
			} else {
				// if the node under inspection has no right child then the newNode 
				// becomes the node under inspection's right child and function exits
				curNode.right = newNode
				return
			}
		}

		// this implementation ignores values that already exist in the tree
		console.error(`Tree already contains value ${value}, ignoring...`)
		return
	}
}


// find will find a node with a passed value or will print out the node found 
// closest node value to that value
BinarySearchTree.prototype.find = function(value) {
	if(!this.root) {
		console.error('err: root node is null')
		return null
	}

	let curNode = this.root
	while(true) {
		console.log(`looking for: ${value}`)
		console.log(`current node is: ${curNode.value}`)
		if(curNode.value > value) {
			if(curNode.left) {
				console.log(`moving left to ${curNode.left.value}`)
				curNode = curNode.left
				continue
			} else {
				console.log(`not found. closest value: ${curNode.value}`)
				return null
			}
		}

		if(curNode.value < value) {
			if(curNode.right) {
				console.log(`moving right to ${curNode.right.value}`)
				curNode = curNode.right
				continue
			} else {
				console.log(`not found. closest value: ${curNode.value}`)
				return null
			}
		}

		console.log(`node found! current node value ${curNode.value}, desired node value: ${value}`)
		return curNode
	}
}

// delete will delete a node with a specified value and ensure that the tree 
// remains properly ordered
BinarySearchTree.prototype.delete = function(value) {
	// ensure that you only attempt to delete from trees 
	// that have nodes
	if (!this.root) {
		console.error('tree has no root node exiting')
		return
	}

	// set up traversal variables
	let prevNode = null
	let curNode = this.root

	// begin looping
	while(true) {
		if (curNode.value > value) {
			// the value you are searching for is less than the value of the node 
			// currently under inspection
			if(curNode.left) {
				// the value we are searching for is less the value of the node currently 
				// under inspection - move left
				prevNode = curNode
				curNode = curNode.left
				continue
			} else {
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} else if (curNode.value < value) {
			// the value of the node is greater than the value of the node 
			// currently under inspection - move right
			if (curNode.right) {
				prevNode = curNode
				curNode =  curNode.right
				continue
			} else {
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} else {
			console.log(`tree does contain node with value ${value} removing it`)
			if (!curNode.left && !curNode.right) {
				// if the node currently under inspection has no children simply
				// remove it
				curNode = null
				return
			} else if (!curNode.left) {
				// if the node currently under inspection has no left child simply
				// set the right child to be the node currently under inspection
				if(!prevNode) {
					this.root = curNode.right
					return
				}

				if(curNode.right.value > prevNode.value) {
					prevNode.right = curNode.right
				} else {
					prevNode.left = curNode.right
				}
				return
			} else if (!curNode.right) {
				// if the node currently under inspection has no right child simply
				// set the left child to be the node currently under inspection
				if(!prevNode) {
					this.root = curNode.left
					return
				}

				if(curNode.left.value > prevNode.value) {
					prevNode.right = curNode.left
				} else {
					prevNode.left = curNode.left
				}
				return
			} else {
				console.log('curNode has right and left children')
				// replace node with rightmost child of the left hand node
				// create reference to 
				let nestedPrevNode = curNode.left 
				let nestedCurNode = curNode.left
				while(nestedCurNode) {
					if(nestedCurNode.right) {
						nestedPrevNode = nestedCurNode
						nestedCurNode = nestedCurNode.right
					} 
				}

				if (prevNode === null) {
					this.root = nestedCurNode 
					return
				} 
				
				if (prevNode.value > nestedCurNode.value) {
					nestedPrevNode.right = null
					prevNode.left = nestedCurNode
				} else {
					nestedPrevNode.right = null
					prevNode.right = nestedCurNode
				}
			}
		}
	}
}

BinarySearchTree.prototype.print = function() {
	if(!this.root) {
		console.error('no root node exiting');
		return
	}
}

const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(3)
bst.insert(12)
bst.insert(30)
bst.insert(28)
bst.insert(12)
bst.insert(16)
bst.insert(13)
bst.insert(15)
bst.insert(2)
bst.find(13)
bst.delete(13)
bst.find(13)


