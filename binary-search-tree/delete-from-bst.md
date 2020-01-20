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

So we have offically found the Node we want to get rid of! What comes next? Well naturally getting rid of it, but hold on, it __may__ not be as easy as just checking to see if the `curNode` is the right or left child of the `prevNode` and nulling that out (then again it may be). 

There are some checks we should perform to ensure that we aren't going to make any orphans when we remove the undesired node (`curNode`). Let's take a look at `CHUNK 1` to see some of the simpler situations we may find ourselves in.

```javascript
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
```

Kind of a big chunk again, but all of the checks are very basic so let's see how they work.

First let's see what happens when the `curNode` (node to delete) has no children.

```javascript
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
```

We ask if the node has no left child and has no right child. When this is true the tree does not have to be rearranged at all. Let's see what we do next.

```javascript
if(!prevNode) {
	console.log(`removing root node`)
	this.root = null 
	return
}
```

#### Checking for `root` Node Status

We check to see if `curNode` is the root node. How do we do this? Well, by checking to see if `prevNode` was ever set to anything. Recall that when we started the function we set two initial variables.

`curNode = this.root // where this === the tree`

`prevNode = null`

Then each time we _"traversed"_ either right or left we set `prevNode` to `curNode` before moving the `curNode` reference to it's new spot for inspections.

So if we never set `prevNode` to anything it is still `null` and we can rest assured that `curNode` is the `root` Node.

In the case where the node we want to remove (`curNode`) is the `root` Node all we need to do is set `this.root` to `null`. We don't need to worry about any orphans in this case as because we are currently inside of an `if` that ensures that the `curNode` has no children. If we find ourselves here the function exists having removed the `curNode`! Cong

Let's see what would happen if the `curNode` has no children, but it isn't the `root`.

```javascript
if(curNode.value > prevNode.value) {
	prevNode.right = null
	return
}
prevNode.left = null
return
```

In this case we do a check to see if the node to delete (`curNode`) is greater than the value of the `prevNode`. We perform this check to determine if the the node to delete is the right or left child of the `prevNode`. When the `curNode.value` is greater than the `prevNode.value` we can determine that the `curNode` must be the right child of the `prevNode` since we know this we can confidently remove the `prevNode`'s right child `prevNode.right = null` and exit the function having properly deleted the node.

Finally, if nothing else has come up true we simply remove `prevNode.left` by setting it to `null` (`prevNode.left = null`). We can do this confidently knowing we will not disrupt the structure of the tree for the following reasons:

- We know the `curNode` has no children since `if (!curNode.left && !curNode.right)` evaluated to true.
- We know that we are not removing the `root` node since `if(!prevNode)` evaluated to false. Recall that if a node has no `prevNode` / parent then it __MUST__ be the root of the tree.
- We know that we are not removing the right node since the value of the `curNode` __MUST__ be less than `prevNode` since `if(curNode.value > prevNode.value)` evaluated to false.

That's it! We have covered option 1 and know how to safely delete any node that has no children.

Let's make things a little trickier and see what happen if the node to remove has a single child (right or left). The process for these situations is exactly the same only reversed in what is being referenced. So we will cover one of the situations in depth and then discuss how the other option is processed briefly.

_Options 2 & 3, What Happens The Node To Remove Has Either A Left OR a Right Child (Not Both)_

Before going further let's establish a fact, at this point we KNOW that the node to delete has at least a right or left child since (if we ended up here) we know that `if (!curNode.left && !curNode.right)` evaluated to false. 

With this information in hand let's do some process of elimination work, we will be doing some negative logic and this is important because our final `else` statement will be our "positive" case. We can't simply ask if the `curNode.right` is truthy because both `curNode.right` and `curNode.left` could both be true, so instead of logic like this `if(curNode.left && !curNode.right)` we can simply write `if(!curNode.right)` and if that evaluates to true we know for certain that the node __ONLY__ has a left child. Recall, once more that we already checked the situation where the node neither has a right nor left child above. So let's track down the following sub-section of the current chunk.

```javascript
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
```

In this section we have established that the __node to remove has at least one child__ and if the primary `if` statement in this chunk evaluates to true then know that it only has one child and that that child is the left child.

When this is the case we will do one of three things.

In the case where the node to delete is the root node (`if(!prevNode)`) then all we need to do is replace the root of the tree with the left child of the `curNode` `this.root = curNode.left`. Now, nothing is referencing the `curNode` and it will be garbage collected. What a wonderfully pleasant case! We can now exit having properly deleted the node we wanted to get rid of.

If it is not the root node then we need to properly choose which child of `prevNode` `curNode` is. To do this we perform the same check we did when we were removing a node with node children.

```javascript
	if(curNode.left.value > prevNode.value) {
		prevNode.right = curNode.left
		return
	} 
	prevNode.left = curNode.left
	return
```

If the `curNode`'s left child is greater than the `prevNode` value then we can assign `curNode.left` to `prevNode.right`. `prevNode.right = curNode.left`, I know this can be confusing, but if the node to remove's left node has a greater value than the `prevNode`'s value then we can know for sure that `curNode` is currently the right child of `prevNode`. With this in place `curNode` will be garbage collected. We can safely exit the function

If `if(curNode.left.value > prevNode.value)` evaluated to false then we know that `curNode` was `prevNode`'s left child and can simply move the tree "up" one node. `prevNode.left = curNode.left`. This removes all references to `curNode` and our work is complete. We can safely exit the function.

Whew! So that is the case of deleting a Node that has left child and does __NOT__ have a right node, but what about the opposite. As we described earlier the process is _mostly_ the same but reversed. Let's see what that looks like.

```javascript
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
```

As you can see the code is almost exactly the same with the largest noticeable difference being that we reference the right node which makes sense, since we only enter this block if the `curNode.left` is _falsey_. To put it as clearly as possible, when we perform a reassignment on the root we replace `this.root` with `curNode`'s (node to remove's) right child. When we perform a reassignment on a `prevNode` either on the right or left side depending on the value of `curNode.right` we replace the reference on the `prevNode` with `curNode.right`.

If this hasn't clicked yet we will perform some tests in a moment which should help.

At this point we have covered all of the functionality presented in `CHUNK 2`! Congratulations you have deleted a Node in a majority of configurations all we have left is the proverbial __"BIG ONE"__

## Chunk Three: Deleting a Node with Right AND Left Children

We finally made it! We have determined that the node to delete exists in the tree and we have determined the following about it.

- It __doesn't__ have falsey values for both left and right children
- It __doesn't__ have a falsey value for left child  
- It __doesn't__ have a falsey value for right child  


So, what left? It must have truthy values for both. Well, what do we do now? I am glad you asked.


