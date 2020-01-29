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
	// deletes can only be called on trees that exist
	if (!this.root) {
		console.error('tree has no root node exiting')
		return
	}

	// prevNode will be the node that any replacement nodes will use as a parent.
	let prevNode = null

	// the node that will be inspected to see if it is the candidate for deletion.
	let curNode = this.root

	// start loop.
	while(true) {

		// check if the value you are searching for is less than the value of the node 
		// currently under inspection.
		if (curNode.value > value) {
			// if the value of the node you are searching for (to delete) is less than the
			// value of the node currently under inspection then check to see if the the node
			// currently under inspection has a left (smaller valued) child.
			if(curNode.left) {
				// if the node currently under inspection does have a left child then move the
				// search to the left. The prevNode will be set to the curNode and the curNode
				// will be set to curNode.left and the loop will start over with these new values.
				prevNode = curNode
				curNode = curNode.left
				continue
			} else {
				// otherwise inform the caller that the node they are searching for was not 
				// found in the tree and exit the function
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} 
		
		// check if the value you are searching for is greater than the value of the node 
		// currently under inspection.
		else if (curNode.value < value) {
			// if the value of the node you are searching for (to delete) is greater than the
			// value of the node currently under inspection then check to see if the the node
			// currently under inspection has a right (larger valued) child.
			if (curNode.right) {
				// if the node currently under inspection does have a right child then move the
				// search to the right. The prevNode will be set to the curNode and the curNode
				// will be set to curNode.right and the loop will start over with these new values.
				prevNode = curNode
				curNode = curNode.right
				continue
			} else {
				// otherwise inform the caller that the node they are searching for was not 
				// found in the tree and exit the function
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} 
		
		// the search has been concluded and a node to remove has been identified and is current set to
		// `curNode` while curNode's parent is set to `prevNode`. If `prevNode` is not `null` it will become
		// the new parent for the node chosen to replace the node to remove in the tree. If, however,
		// `prevNode` is null then we are reassigning the tree's root.
		else {
			// inform the user that the node has been found and that it is now in the 
			// process of being removed.
			console.log(`tree does contain node with value ${value} removing it`)
			
			// check to see if the node to delete has no children
			if (!curNode.left && !curNode.right) {
				console.log(`the node to remove from the tree has no right or left child`)
				// check to see if the node to delete is the root node
				if(!prevNode) {
					// if the node to remove is the root node and the root node has no children
					// the root may be set to null and the function can safely exited 
					// NOTE: This means the entire tree is gone.
					console.log(`removing root node`)
					this.root = null 
					return
				}

				// if it was not the root node then it is just a node with no children and
				// can thus be safely throw into the garbage and the function may exit
				if(curNode.value > prevNode.value) {
					prevNode.right = null
					return
				}

				prevNode.left = null
				return
			} 

			// at this point it has been established that the curNode (the node to remove)
			// has AT LEAST one child so we now move on to checking for the simplest 
			// possible solution to safely maintaining tree integrity while removing the 
			// node the caller wishes to remove.
			
			// check to see if the node to remove has no left child and therefore must have a 
			// right child (see previous check)
			else if (!curNode.left) {
				console.log(`the node to remove from the tree has no left child, but must have a right child`)
				// if the node to remove does have a right child then check to see if the 
				// node to delete was the root.
				if(!prevNode) {
					// if the node to remove was the root AND we know that the root had no left child
					// then we can set the root to be the `curNode.right` node and we can exit 
					this.root = curNode.right
					return
				}

				// if the node to remove was not the root node then we must rearrange the tree a bit
				// check to see if the right child of the `curNode` (the node to remove) has a greater
				// value than the `prevNode`
				if(curNode.right.value > prevNode.value) {
					// if this is true then we are removing the `prevNode`'s right child and can promote 
					// `curNode.right` to take it's place and we can exit having removed all references 
					// `curNode` (the node to remove)
					prevNode.right = curNode.right
					return
				}

				// otherwise we know that the `curNode` is the `prevNode`'s left child 
				// and we can simply replace `prevNode.left` with `curNode.right` WHEW!.
				// Note: this is only true because our tree doesn't accept non-unique items 
				prevNode.left = curNode.right
				return
			} 
			
			// if the tree has a left node we will check to see if it has a right node 
			else if (!curNode.right) {
				// if the node to remove does have a left child (and has no right child) 
				// then check to see if the node to delete is the root.
				if(!prevNode) {
					// if the `curNode` was the root node then we may simply assign the root of the 
					// tree to be `curNode.left` and exit.
					// Note: This will have no negative impact on the right side since the right side
					// does not exist!
					this.root = curNode.left
					return
				}

				// otherwise we need to find out where to reattach the node to the `prevNode`
				// check to see if the value of the curNode's (the node to remove) left child
				// is greater than the value of the `prevNode`
				if(curNode.left.value > prevNode.value) {
					// if it is greater then we can reassign `prevNode.right` to be the `curNode`'s 
					// (node to remove's) `left` property. Thus removing all references
					// the `curNode` allowing us to safely exit
					prevNode.right = curNode.left
					return
				} 

				// otherwise `curNode` was `prevNode`'s `left` and we can simply promote the 
				// `curNode`'s left property to be the `prevNode`'s new left property
				prevNode.left = curNode.left
				return
			} 
			
			// if we have made it this far we know that the node to delete has both right 
			// and left children (since we have checked every other situation) at this point
			// there is no way around doing a considerable amount of tree manipulation.
			
			// the process can be broken up into five parts
			// 1. find the right-most child of the `curNode`'s (node to remove) left child
			// Node: repeat that sentence till it makes sense
			// 2. find out if the `curNode` was greater or less than the prevNode or if the `prevNode`
			// was null then handle deleting the root
			// we have handled this situation for the other permutation above so refer back to those
			// 3. attach the right-most child of the `curNode`'s (node to remove) left child (found in step 1)
			// to the correct spot on the prevnode is applicable
			// 4. attach the right child of the `curNode` (the node to remove) 
			// to the right property of the "right-most child of the `curNode`'s (node to remove) left child node"
			// 5. exit 
			
			else {
				// inform the caller that the node to delete has right and left child
				console.log(`node to remove has both right and left child`)

				// create the world's worst variable name
				let rightMostOfLeft = curNode.left
				let rightMostOfLeftPrev = null

				while(rightMostOfLeft.right) {
					// inform caller of the current state of the inner loop
					const printableRightMostOfLeftPrev = rightMostOfLeftPrev? rightMostOfLeftPrev.value : 'NONE'
					console.log(`traversing to right most child of left child of curNode:${curNode.value}`)
					console.log(`rightMostOfLeft: ${rightMostOfLeft.value}, rightMostOfLeftPrev: ${printableRightMostOfLeftPrev}`)

					// reset variables to correct values for next loop iteration
					rightMostOfLeftPrev = rightMostOfLeft
					rightMostOfLeft = rightMostOfLeft.right
				}

				// inform caller of the current of the nodes that will be used to reset the tree
				const printableRightMostOfLeftPrev = rightMostOfLeftPrev? rightMostOfLeftPrev.value : 'NONE'
				console.log(`Found! rightMostOfLeft: ${rightMostOfLeft.value}, rightMostOfLeftPrev: ${printableRightMostOfLeftPrev}`)

				// handle the situation where we are deleting a root node with a right and left value
				if(!prevNode) {
					console.log(`node to remove is root with right and left child.`)
					// set root to the right most of the left of the node to remove (`curNode`)
					this.root = rightMostOfLeft

					// if rightMostOfLeftPrev is not null it means we need to ensure that
					// if the rightMostOfLeft had a left child it is correctly placed
					if(rightMostOfLeftPrev) {
						// make sure the left hand node of `rightMostOfLeft` is not orphaned
						// if it exists at all (if it doesn't )
						rightMostOfLeftPrev.right = rightMostOfLeft.left

						// in the case where a right hand child of the left hand node was truthy
						// the left hand node of the curNode will need to be attached the rightMostOfLeft
						rightMostOfLeft.left = curNode.left
					}

					// always reattach the right hand child of curNode to rightMostOfLeft
					rightMostOfLeft.right = curNode.right
					return
				}

				// otherwise we need to determine if replacement node goes to the right or left
				// of the `prevNode`
				
				// check if the right most child of the left child of the node to delete is greater than
				// the `prevNode.value`
				if(rightMostOfLeft.value > prevNode.value) {
					// if it is then set `prevNode.right` to be the right most child of the left child 
					// of the node to delete (this has the consequence of removing `curNode`!)
					prevNode.right = rightMostOfLeft

					// if rightMostOfLeftPrev is not null it means we need to ensure that
					// if the rightMostOfLeft had a left child it is correctly placed
					if(rightMostOfLeftPrev) {
						// make sure the left hand node of `rightMostOfLeft` is not orphaned
						// if it exists at all (if it doesn't )
						rightMostOfLeftPrev.right = rightMostOfLeft.left

						// in the case where a right hand child of the left hand node was truthy
						// the left hand node of the curNode will need to be attached the rightMostOfLeft
						rightMostOfLeft.left = curNode.left
					}

					// always reattach the right hand child of curNode to rightMostOfLeft
					rightMostOfLeft.right = curNode.right

					// all references to `curNode` are gone and the tree has been reshaped to make sure all 
					// items have proper references. we can exit!
					return
				}


				// finally, if `prevNode.value` is greater than the right most child of the 
				// left child of the node to remove then we attach the `rightMostOfLeft` to the
				// left of the `prevNode` and recreate the rest of the tree
				prevNode.left = rightMostOfLeft

					// if rightMostOfLeftPrev is not null it means we need to ensure that
					// if the rightMostOfLeft had a left child it is correctly placed
					if(rightMostOfLeftPrev) {
						// make sure the left hand node of `rightMostOfLeft` is not orphaned
						// if it exists at all (if it doesn't )
						rightMostOfLeftPrev.right = rightMostOfLeft.left

						// in the case where a right hand child of the left hand node was truthy
						// the left hand node of the curNode will need to be attached the rightMostOfLeft
						rightMostOfLeft.left = curNode.left
					}

					// always reattach the right hand child of curNode to rightMostOfLeft
					rightMostOfLeft.right = curNode.right

				// all references to `curNode` are gone and the tree has been reshaped to make sure all 
				// items have proper references. we can exit!
				return
			}
		}
	}
}

BinarySearchTree.prototype.print = function() {
	if(!this.root) {
		console.error('no root node exiting');
		return
	}

	const tree = createJSONTree(this.root)

	console.log(JSON.stringify(tree, null, 2))
}

const createJSONTree = function(node) {
	const tree = {value: node.value}
	tree.left =  node.left === null ? null : createJSONTree(node.left)
	tree.right = node.right ===  null ? null : createJSONTree(node.right)
	return tree
}

// const bst = new BinarySearchTree()
// bst.insert(15)
// bst.insert(25)
// bst.insert(5)
// bst.insert(10)
// bst.insert(20)
// bst.insert(3)
// bst.insert(30)

// bst.print()
// console.log('-----------------')
// bst.delete(5)
// console.log('-----------------')
// bst.print()


module.exports = {BinarySearchTree, createJSONTree}