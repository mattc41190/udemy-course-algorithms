# Traverse Recursion Example

## What is this?

This is an examination of traversing a binary search tree.

## Why make this?

Because recursion is hard as hell for some people... like me.

## How do I use this? 

- Read it

## Example Binary Search Tree

We will be examining the following binary search tree (bst).

```
        10
       /  \
     5     12
    / \
   2   7 
```

## Code

Here is the code we will use to traverse it.

```javascript
function traverse(node) {
  const tree = { value: node.value }
  tree.left = node.left === null ? null : traverse(node.left)
  tree.right = node.right === null ? null : traverse(node.right)
  return tree
}
```

## How does `traverse` work?

### This bit will get old

Let's say we passed in the root node which has a value of `10`.

The very first thing we do is make an object that looks like this:

```javascript
const tree = {value: 10}
```

Next we create and assign a `tree.left` (_note: not node.left_) to one of two possible values.

__Option A:__

If the __NODE__ we passed in has no left child we assign `tree.left` to be `null` and move on with an object that looks like this.

```javascript
// tree
{value: 10, left: null}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a left child we pass that node to `traverse`.

__Choice: Option B Followed__

In this case we had a left child so now we pass the node with a value of 5 to `traverse`.

### _This next bit will get very old..._

The very first thing we do is make an object that looks like this:

```javascript
const tree = {value: 5}
```

Next we create and assign a `tree.left` (_note: not node.left_) to one of two possible values.

__Option A:__

If the __NODE__ we passed in has no left child we assign `tree.left` to be `null` and move on with an object that looks like this.

```javascript
// tree
{value: 5, left: null}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a left child we pass that node to `traverse`.

__Choice: Option B Followed__

In this case we had a left child so now we pass the node with a value of 2 to `traverse`.

### _This next bit will get very very old..._

The very first thing we do is make an object that looks like this:

```javascript
const tree = {value: 2}
```

Next we create and assign a `tree.left` (_note: not node.left_) to one of two possible values.

__Option A:__

If the __NODE__ we passed in has no left child we assign `tree.left` to be `null` and move on with an object that looks like this.

```javascript
// tree
{value: 2, left: null}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a left child we pass that node to `traverse`.

### Whoa! That's different... but you'll get used to it

__Choice: Option A Followed__

In this case the `2` node has no left child so we continue on to next line now possesing an object which for the firs time has a `tree.left` value assigned to something (even if that something is `null`)

```javascript
// tree
{value: 2, left: null}
```

### Great now what?

Well we move on to the next line of course.

```javascript
tree.right = node.right === null ? null : traverse(node.right)
```

### Oh great this looks familiar 

Now we ask the same question for the right child of the `2` node

We create and assign a `tree.right` (_note: not node.right_) to one of two possible values.

__Option A:__

If the __NODE__ we passed in has no right child we assign `tree.right` to be `null` and move on with an object that looks like this.

```javascript
// tree
{
	value: 2, 
	left: null,
	right: null
}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a right child we pass that node to `traverse`.

__Choice: Option A Followed__

The `2` node has no right child and so we have officially exhausted our efforts to dig down into the tree and for the first time must return to never again visit the `2` node. Farewell `2` node.

### But who are we returning this to?

In this case we are returning the object to the function just above it in the call stack remember when we were looking at the node that had `5` as the `value` property and currently have a `tree` variable there that looks like:

```javascript
const tree = {value: 5}
```

Well, now we know what its left value looks like!

```javascript
// tree
{
	value: 5, 
	left: {
		value: 2, 
		left: null,
		right: null
	}
}
```

### Whoa what's going on here?

As you can see the tree (at this level of recursion) is a bit fuller, but what happens next?

Well now we can move down to the following line of code

```javascript
tree.right = node.right === null ? null : traverse(node.right)
```

### Now for some familiar-ish looking code

Next we create and assign a `tree.right` (_note: not node.right_) to one of two possible values.

__Option A:__

If the __NODE__ we passed in has no right child we assign `tree.right` to be `null` and move on with an object that looks like this.

```javascript
// tree
{
	value: 5, 
	left: {
		value: 2, 
		left: null,
		right: null
	},
	right: null
}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a right child we pass that node to `traverse`.

### Okay I am seeing a pattern start to emerge here...

__Choice: Option B Followed__

In this case we had a right child so now we pass the node with a value of 7 to `traverse`.

### _This next bit will get very very very old..._

The very first thing we do is make an object that looks like this:

```javascript
const tree = {value: 7}
```

Next we create and assign a `tree.left` (_note: not node.left_) to one of two possible values.

__Option A:__

If the __NODE__ we passed in has no left child we assign `tree.left` to be `null` and move on with an object that looks like this.

```javascript
// tree
{value: 7, left: null}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a left child we pass that node to `traverse`.

__Choice: Option A Followed__

In this case the `7` node has no left child. On to the second inspection.

with a current tree value that looks like this:

```javascript
// tree
{value: 7, left: null}
```

Next we create and assign a `tree.right` (_note: not node.right_) to one of two possible values.

__Option A:__

If the __NODE__ we passed in has no right child we assign `tree.right` to be `null` and move on with an object that looks like this.

```javascript
// tree
{
	value: 7, 
	left: null,
	right: null
}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a right child we pass that node to `traverse`.

__Choice: Option A Followed__

In this case the `7` node has no right child and it looks like we are ready to return our tree to the caller (_we should consider calling it the "`5` node scope caller" or something?_)

Our current tree value looks like this:

```javascript
// tree
{
	value: 7, 
	left: null, 
	right: null
}
```

### Climbing back up again!

Recall that the last time we left the `5` node its tree value looked like this:


```javascript
// tree
{
	value: 5, 
	left: {
		value: 2, 
		left: null,
		right: null
	}
}
```
Now we can (joyously) assign a value to its right node! Like so.


```javascript
// tree
{
	value: 5, 
	left: {
		value: 2, 
		left: null,
		right: null
	},
	right: {
		value: 7, 
		left: null,
		right: null
	}
}
```

I am sure by now you can see the pattern, but just to be totally thorough we will finish off the remaining inspections and tree additions.

### All the way up!

Now that we have finished "handling" the 5 node (i.e. attaching all those nested values in it) we can return the tree to the caller in this case the `10` node caller.

### It's good to be home!

Now that we have returned the `5` node tree our `10` node tree looks like:

```javascript
// tree
{
	value: 10,
	left: {
	value: 5, 
		left: {
			value: 2, 
			left: null,
			right: null
		},
		right: {
			value: 7, 
			left: null,
			right: null
		}
	}
}
```

By now you can most assuredly guess what we are going to do, but for this to really be complete we need to do it a few more times.

### Where do we go from here?

Well, naturally now that the left node has been added to the `tree` all that's left to do is examine the `10` node's right child.

__Option A:__

If the __NODE__ we passed in has no right child we assign `tree.right` to be `null` and move on with an object that looks like this.

```javascript
// tree
{
	value: 10,
	left: {
	value: 5, 
		left: {
			value: 2, 
			left: null,
			right: null
		},
		right: {
			value: 7, 
			left: null,
			right: null
		}
	},
	right: null
}
```

__Option B:__

Otherwise (and this is the important part) if the __NODE__ we passed in has a right child we pass that node to `traverse`.

__Choice: Option B Followed__

In this case we had a right child so now we pass the node with a value of 12 to `traverse`.

### Not this again!

Yes, this again!

We ask if the `12` node has a left child it does not so do do not need to call traverse providing us with a tree that looks like this:

```javascript
// tree
{
	value: 12, 
	left: null, 
}
```

We repeat the process once more for the right hand side and find that the `12` node has no right child and so we may return the following object to the `10` node caller.

```javascript
// tree
{
	value: 12, 
	left: null, 
	right: null
}
```

### Oh my gosh, it's finally over!

We can officially set the right hand side of the tree and create our final product.

Here it is on all it's glory.

```javascript
// tree
{
	value: 10,
	left: {
	value: 5, 
		left: {
			value: 2, 
			left: null,
			right: null
		},
		right: {
			value: 7, 
			left: null,
			right: null
		}
	},
	right: {
		value: 12,
		left: null,
		right: null
	}
}
```

## Aren't you glad computers will do this for us?