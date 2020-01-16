# How To Delete A Node from a Binary Search Tree

## What is this?

This is an examination of the delete operation on a binary search tree.

## Why make this?

Because reasoning about delete operations on binary search trees can be difficult, so why not make it a little easier with some friendly diagrams and step by step processes written down.

## How do I use this?

- Read it!

## Starting Place

### The Tree

```
						 10
						/  \								
					5    15 
				/		\	           
			2      6
				\
			  	3
					  \
						  4
```

### Tree as JSON

```json
{
  "value": 10,
  "left": {
    "value": 5,
    "left": {
      "value": 2,
      "left": null,
      "right": {
        "value": 3,
        "left": null,
        "right": {
          "value": 4,
          "left": null,
          "right": null
        }
      }
    },
    "right": {
      "value": 6,
      "left": null,
      "right": null
    }
  },
  "right": {
    "value": 15,
    "left": null,
    "right": null
  }
}
```

### Code to Create The Tree

```javascript
const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(5)
bst.insert(2)
bst.insert(3)
bst.insert(4)
bst.insert(6)
bst.insert(15)
```

## The Glorious Delete Method

Let's take a look a the delete method we will be utilizing. 

```javascript
BinarySearchTree.prototype.delete = function(value) {
// CHUNK 1 - START
	if (!this.root) {
		console.error('tree has no root node exiting')
		return
	}
	let prevNode = null
	let curNode = this.root
	while(true) {
		if (curNode.value > value) {
			if(curNode.left) {
				prevNode = curNode
				curNode = curNode.left
				continue
			} else {
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} 
		else if (curNode.value < value) {
			if (curNode.right) {
				prevNode = curNode
				curNode = curNode.right
				continue
			} else {
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} 
// CHUNK 1 - END
// CHUNK 2 - START
		else {
			console.log(`tree does contain node with value ${value} removing it`)
			if (!curNode.left && !curNode.right) {
				console.log(`the node to remove from the tree has no right or left child`)
				if(!prevNode) {
					console.log(`removing root node`)
					this.root = null 
					return
				}
				if(curNode.value > prevNode.value) {
					prevNode.right = null
					return
				}
				prevNode.left = null
				return
			} 
			else if (!curNode.left) {
				console.log(`the node to remove from the tree has no left child, but must have a right child`)
				if(!prevNode) {
					this.root = curNode.right
					return
				}
				if(curNode.right.value > prevNode.value) {
					prevNode.right = curNode.right
					return
				}
				prevNode.left = curNode.right
				return
			} 
			else if (!curNode.right) {
				if(!prevNode) {
					this.root = curNode.left
					return
				}
				if(curNode.left.value > prevNode.value) {
					prevNode.right = curNode.left
					return
				} 
				prevNode.left = curNode.left
				return
			}
// CHUNK 2 - END 
// CHUNK 3 - START 
			else {
				console.log(`node to remove has both right and left child`)
				const nodeToRemoveLeft = curNode.left
				const nodeToRemoveRight = curNode.right
				let rightMostOfLeft = curNode.left
				let rightMostOfLeftPrev = null
				while(rightMostOfLeft.right) {
					const printableRightMostOfLeftPrev = rightMostOfLeftPrev? rightMostOfLeftPrev.value : 'NONE'
					console.log(`traversing to right most child of left child of curNode:${curNode.value}`)
					console.log(`rightMostOfLeft: ${rightMostOfLeft.value}, rightMostOfLeftPrev: ${printableRightMostOfLeftPrev}`)
					rightMostOfLeftPrev = rightMostOfLeft
					rightMostOfLeft = rightMostOfLeft.right
				}
				const printableRightMostOfLeftPrev = rightMostOfLeftPrev? rightMostOfLeftPrev.value : 'NONE'
				console.log(`Found! rightMostOfLeft: ${rightMostOfLeft.value}, rightMostOfLeftPrev: ${printableRightMostOfLeftPrev}`)
				if(!prevNode) {
					console.log(`node to remove is root with right and left child.`)
					this.root = rightMostOfLeft
					if(rightMostOfLeftPrev) {
						rightMostOfLeftPrev.right = null
						rightMostOfLeft.left = nodeToRemoveLeft
					}
					rightMostOfLeft.right = nodeToRemoveRight
					return
				}
				if(rightMostOfLeft.value > prevNode.value) {
					prevNode.right = rightMostOfLeft
					if(rightMostOfLeftPrev) {
						rightMostOfLeftPrev.right = null
						rightMostOfLeft.left = nodeToRemoveLeft
					}
					rightMostOfLeft.right = nodeToRemoveRight
					return
				}
				prevNode.left = rightMostOfLeft
				if(rightMostOfLeftPrev) {
					rightMostOfLeftPrev.right = null
					rightMostOfLeft.left = nodeToRemoveLeft
				}
				rightMostOfLeft.right = nodeToRemoveRight
				return
			}
		}
	}
// CHUNK 3 - END 
}
```

Wow! That's a pretty heavy method! Don't worry though we are go to break it into easy to consume chunks.

## Chunk One: Does the Node Exist?

Let's start by taking a look at `CHUNK 1`.

```javascript
// CHUNK 1 - START
	if (!this.root) {
		console.error('tree has no root node exiting')
		return
	}
	let prevNode = null
	let curNode = this.root
	while(true) {
		if (curNode.value > value) {
			if(curNode.left) {
				prevNode = curNode
				curNode = curNode.left
				continue
			} else {
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} 
		else if (curNode.value < value) {
			if (curNode.right) {
				prevNode = curNode
				curNode = curNode.right
				continue
			} else {
				console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
				return
			}
		} 
// CHUNK 1 - END
```

When you get right down to it this particular chunk of code is not very difficult. The first thing we do is ensure that we are in a valid state to attempt a delete:

```javascript
if (!this.root) {
	console.error('tree has no root node exiting')
	return
}
```

If the tree we are investigating is invalid we simply exit the function after informing the user of their poor luck.

Once we have established that the tree is valid and therefore a delete is __possible__ we do a little set up. This part is pretty important and will come up time and time again. We create two variables that we leave open to being reset.

```javascript
let prevNode = null
let curNode = this.root
```

We create a placeholder for the node that was last traversed to and call it `prevNode`. Each time we traverse either right or left we will leave a single bread crumb for ourselves to _remember_ who our parent was. When we start out we are at the root of the tree and as such have no parent for this reason we set `prevNode` to `null`. Later on when we need to know how to reattach a child/grandchild of a deleted node to its new parent (this will make more sense later) we will reference the `prevNode`.

We also set a variable called `curNode` to `this.root` because we have to start checking for the node to delete somewhere, right!

Alright, we have established our starting variables and are ready to begin inspection. We start an infinite and start poking around.

```javascript
while(true) {/*code that will cause the function to return*/}
```

The first thing we check once inside the loop is if the value of the `curNode` (I will also call this the node under inspection) is greater than the value of the node we want to delete.

```javascript
if (curNode.value > value) {
	if(curNode.left) {
		prevNode = curNode
		curNode = curNode.left
		continue
	} else {
		console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
		return
	}
} 
```

When this `if` statement returns `true` we know that the value of the node we want to delete is less than the value of the `curNode`. Since this is true, we also know that the the value of the node we want to delete cannot possibly be the `curNode`, nor anything to the right side of the `curNode` since according to the rules of binary trees no node to the right can be less than the value of the node we are currently on (repeat that one a few times). So with all the things that cannot be true established we can by process of elimination know that if the value we want to delete does exist it will exist to the left of the `curNode`. So, naturally, we ask if the `curNode` has a left child if it does, then hooray we take a mosey over to the left and ask our loop to begin anew with new new values for `cirNode` and `prevNode` like so:

```javascript
prevNode = curNode
curNode = curNode.left
continue
```

Other wise it is the end of the line and we make the caller aware of their poor luck.

```javascript
console.error(`tree does not contain node with value ${value} - closest value ${curNode.value}`)
return
```

The second thing we do (and this on the occasion that the first `if` was false since that statement either ends in an exit for the entire function or starts the loop over again with new values) is check to see if the value we are looking for is greater than the value of the `curNode`. If it is then we perform the inverse checks to the checks performed where it is less than the value of the `curNode`. I won't type it up in as much detail, but I will provide it in brief just to be thorough.

We determine that if the value exists it must be to the right of the `curNode` and as such we will attempt to traverse (or start the loop over using `curNode.right` as the `curNode` value for that iteration) to the right node provided it exists while at the same time setting the `prevNode` to the `curNode` to keep a bread crumb to the most recent parent (importsnt for later). In the case that the value we are looking is greater than `curNode` and `curNode.right` is null we know that the value we are looking for cannot possibly exist in our tree and we inform the caller of their poor luck and exit.

Look at that we did it! We made it through `CHUNK 1`! We know that we will continue looking for node right to right to left to left (or whatever combination) as long as a node exists that __could__ be the node we are looking for we will `continue` on down the loop checking each one in turn.

We have made it to our first `else` statement! This can mean only one thing, the value of the node we are searching for is the node we are currently inspecting! We found him boys! Now, let's get rid of him!

## Chunk Two: The Node Exists, What are you gonna do about it?

...

