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
						rightMostOfLeftPrev.right = rightMostOfLeft.left
						rightMostOfLeft.left = curNode.left
					}
					rightMostOfLeft.right = curNode.right
					return
				}
				if(rightMostOfLeft.value > prevNode.value) {
					prevNode.right = rightMostOfLeft
					if(rightMostOfLeftPrev) {
						rightMostOfLeftPrev.right = rightMostOfLeft.left
						rightMostOfLeft.left = curNode.left
					}
					rightMostOfLeft.right = curNode.right
					return
				}
				prevNode.left = rightMostOfLeft
					if(rightMostOfLeftPrev) {
						rightMostOfLeftPrev.right = rightMostOfLeft.left
						rightMostOfLeft.left = curNode.left
					}
					rightMostOfLeft.right = curNode.right
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


So, what's left? It must have truthy values for both children. Well, what do we do now? I am so glad you asked.

At this point __some child or grandchild__ (we will get into how to determine this soon) of the `curNode` must do one of two things depending on the value of `prevNode`:

- Attach itself to the root reference of the tree and attach the opposite child (the unselected _initial direction_ child) to the appropriate directional reference on itself.   

- Attach itself to the `prevNode` at the appropriate directional reference and attach the opposite child (the unselected _initial direction_ child) to the appropriate directional reference on itself.  


Let's breakdown what we mean by these choices. Firstly, we need to review the rules of a binary search tree.

1. A Node __must__ have a value
2. A Node __can__ have a left child who is also a Node and whose value __must__ be less than it's parent Node
3. A Node __can__ have a right child who is also a Node and whose value __must__ be greater than it's parent Node

That's it, but there are some logical conclusions we can draw from these statements that might not be immediately obvious. Let's examine them.

- No node to the left of a parent can ever be greater than that parent no matter how many right hand branches exist.

- No node to the right of a parent can ever be less than that parent no matter how many left hand branches / children exist

I know that may seem redundant but examine what comes next. When deleting a `curNode` that has two children you need to replace the `curNode` with one of four possible nodes.

_Note: When doing this in code you may only select a strict subset of these choices which will be demonstrated during the code walk through._

### Choice Set A

__A left child with no right child (let's call this `curNodeLeft`)__
- In this case you can rest assured of two things:
	- You will have no issue placing its left child, which, if it exists, will be `curNodeLeft.left`, since there is no way it is greater than its parent. 
	- You will have no issue placing its right child, which will be `curNode.right`, since there is no right child to conflict with on `curNodeLeft` 

__The right most child or grandchild (only ever traversing right never left) of the left child of `curNode` (let's call this `curNodeLeftRightMost`)__

- In this case you can rest assured of two things:
	- You will have no issue placing the left node, which will be `curNode.left`, since there is no way it is greater than `curNodeLeftRightMost` since by definition it can't be since `curNode.left` has at least one right child which must by the rules of binary search trees be larger than its parent.  
	- You will have no issue placing the right node, which will be `curNode.right`, since `curNode.right` must be greater than `curNodeLeftRightMost` because `curNodeLeftRightMost` is after all (and this is why we reviewed the rules) to the left of `curNode`.
- _Note: When you do this replace operation you must ensure that if `curNodeLeftRightMost` has a left child that it takes it rightful spot in the position that `curNodeLeftRightMost` used to occupy on a node we will lovingly call `curNodeLeftPrevRightMost`._

### Choice Set B

__A right child with no left child (let's call this `curNodeRight`)__
- In this case you can rest assured of two things:
	- You will have no issue placing `curNodeRight`'s right child, if it exists, since there is no way it is less than its parent it can simply stay where it is `curNodeRight.right`. 
	- You will have no issue placing its left child, which will be `curNode.left`, since there is no left child to conflict with on `curNodeRight`

__The left most child or grandchild (only ever traversing left never right) of the right child of `curNode` (let's call this `curNodeRightLeftMost`)__
- In this case you can rest assured of two things:
	- You will have no issue placing the right node which will be `curNode.right` to `curNodeRightLeftMost.right`. This must be the case since the `curNode.right` obviously has a right child because you literally just found its left-most child/grandchild.
	- You will have no issue placing the left node (`curNode.left`) for this node to `curNodeRightLeftMost.left` since it must be merit of `curNodeRightLeftMost` being to the right of `curNode` be larger than `curNode.left` and `curNode.left` must exist since we are in the `if` block that necessitates that truth.
- _Note: If `curNodeRightLeftMost` has a right child it must be taken care of. It can, of course simply be promoted to `curNodeRightPrevLeftMost.left` since it must by definition be smaller than `curNodeRightPrevLeftMost` because `curNodeRightLeftMost` is to the left of it. 

__Rationale__

Hopefully, the reason for the grouping is obvious, but just in case it's unclear the reason for choice sets A and B is that by choosing one of the two "easier" approaches you unlock the reason that the second choice in each set is required.

Allow me to explain further, if you attempted the first choice set the first thing you would is ask if `curNode.left` had any right children,  by examining `curNode.left.right`, and if it doesn't __BULLY FOR YOU!__ you got out of a sticky situation easily just leave the left child alone and stick `curNode.right` to `curNode.left.right` reset the `root` or `prevNode` reference and exit. However what do you do with `curNode.right` when `curNode.left.right` isn't null? The answer? You must find the node that allows the tree to remain valid the best way to do this is by finding the node in the `curNodeLeft` sub-tree that is the largest value contained. To do this the only place we can ever look is to the right child and once we find there is no right child we can confidently say we have found the largest value in the `curNodeLeft` sub-tree. This value will have no right child and thus `curNode.right` will cleanly fit here (as discussed above) and `curNode.left` can easily be assigned to `curNodeLeftRightMost` since `curNode.left` will logically be less than `curNodeLeftRightMost`. 

### Get On With It!

Okay I know that was a heck of a departure, but now we can finally investigate the code sample.

```javascript
// CHUNK 3 - START 
			else {
				console.log(`node to remove has both right and left child`)
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
						rightMostOfLeftPrev.right = rightMostOfLeft.left
						rightMostOfLeft.left = curNode.left
					}
					rightMostOfLeft.right = curNode.right
					return
				}
				if(rightMostOfLeft.value > prevNode.value) {
					prevNode.right = rightMostOfLeft
					if(rightMostOfLeftPrev) {
						rightMostOfLeftPrev.right = rightMostOfLeft.left
						rightMostOfLeft.left = curNode.left
					}
					rightMostOfLeft.right = curNode.right
					return
				}
				prevNode.left = rightMostOfLeft
					if(rightMostOfLeftPrev) {
						rightMostOfLeftPrev.right = rightMostOfLeft.left
						rightMostOfLeft.left = curNode.left
					}
					rightMostOfLeft.right = curNode.right
				return
			}
		}
	}
// CHUNK 3 - END 
```

the very first thing we do is set up some new inner loop starting variables.

```javascript
let rightMostOfLeft = curNode.left
let rightMostOfLeftPrev = null
```

Now we begin an inner traversal in which we attempt to find the rightmost node of the left child of the `curNode` or just the left child of the curNode is `curNode.left.right` doesn't exist.

```javascript
while(rightMostOfLeft.right) {
	const printableRightMostOfLeftPrev = rightMostOfLeftPrev? rightMostOfLeftPrev.value : 'NONE'
	console.log(`traversing to right most child of left child of curNode:${curNode.value}`)
	console.log(`rightMostOfLeft: ${rightMostOfLeft.value}, rightMostOfLeftPrev: ${printableRightMostOfLeftPrev}`)
	rightMostOfLeftPrev = rightMostOfLeft
	rightMostOfLeft = rightMostOfLeft.right
}
```

As you can see most of the this code is debug log statements that inform the caller of the state of the search, and the important bits continue a pattern are all too familiar with. We set the `rightMostOfLeftPrev` to `rightMostOfLeft` and we set `rightMostOfLeft` to `rightMostOfLeft.right` since we know that `rightMostOfLeft.right` cannot be null since  `while(rightMostOfLeft.right)` returned true.

Once we have found the right most child of the left hand side of the `curNode` (note that the right most of left could be the `curNode.left` itself if `curNode.left.right` is falsey) it is time to swap `curNode` for `rightMostOfLeft` and safely replace all the pointers therein.

The first case we check for is if the `prevNode` (REMEMBER THAT GUY!) is null. When it is null we know we are deleting the `root` node and replacing it with it's largest (or right-most) left-hand child.

```javascript
if(!prevNode) {
	console.log(`node to remove is root with right and left child.`)
	this.root = rightMostOfLeft
	if(rightMostOfLeftPrev) {
		rightMostOfLeftPrev.right = rightMostOfLeft.left
		rightMostOfLeft.left = curNode.left
	}
	rightMostOfLeft.right = curNode.right
	return
}
```

The first thing we do is replace `this.root` which up until now pointed at `curNode` with `rightMostOfLeft` effectively deleting the `curNode` when the function exits (as nothing will reference `curNode` anymore and it will be garbage collected).

Next we perform a very important check which will be repeated every time we attempt to replace the `curNode` for the `rightMostOfLeft` node.

```javascript
if(rightMostOfLeftPrev) {
	rightMostOfLeftPrev.right = rightMostOfLeft.left
	rightMostOfLeft.left = curNode.left
}
```

This check checks to see if the `curNode.left` ever had a right child or if `rightMostOfLeft` is in fact `curNode.left`. If it `curNode.left` had at least 1 child we need to make sure we do a couple things. 

First, we need to ensure that if `rightMostOfLeft` had a left child that it is promoted and becomes the right child of the `rightMostOfLeftPrev` and isn't orphaned (recall ANY child to the right of the `rightMostOfLeftPrev` is by definition grater than the `rightMostOfLeftPrev` node).

Second we reassign the `rightMostOfLeft`'s left child to be `curNode.left` since right now it is oprhaned. This is only required in the case where we traversed right because otherwise the left child of `rightMostOfLeft` is `curNode.left.left` and this was already true and require no reassignment.

Lastly, we assign the `curNode`'s right child to be the right child of `rightMostOfLeft` and exit the function.

```javascript
	rightMostOfLeft.right = curNode.right
	return
```

For the remaining cases the logic is largely the same with the exception of instead of replacing the `root` with `rightMostOfLeft` we are replacing either the left or right child `prevNode` with `rightMostOfLeft` and in these cases the logic is the same as we saw above; if `rightMostOfLeft` is smaller than `prevNode` then we are replacing `curNode` at `prevNode.left` and if `rightMostOfLeft` is greater than `prevNode` we are replacing `curNode` at `prevNode.right`.

In each of these cases we check to see if we need to handle any left-hand orphans at `rightMostOfLeft`'s previous home. We place the `curNode`'s left-hand child properly if need be and we always attach `curNode.right` to `rightMostOfLeft.right`.

With these cases all squared away we officially done it. We have deleted a node from a binary search tree.


```javascript
{
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
}
```


	