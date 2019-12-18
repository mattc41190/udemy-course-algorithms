# Linked List

## What is this?

This is an overview and implementation (in javascript) of a Linked List (LinkedList). A Linked List (or Doubly Linked List) is a data structure made up of "Nodes" in which every Node maintains a reference to the Node that comes after it (and in the case of the Doubly Linked List the one that comes before it as well).

## Why make this?

So I have a place to refer to when reviewing for interviews or I am just interested in the Linked List data structure.

## How do I use this?

- Read the code 
- Run the code 
- Comprehend the code

## LinkedLists In Depth

### What makes up a LinkedList? 

A LinkedList is a collection of containers (also called "nodes"), it includes references to the first and last containers, as well as a count of all the containers in the LinkedList, it does not matter what the containers happen to contain, all that matters is that in addition to carrying some value they also maintain a reference to other containers. Here is a simple visual explanation.

(0)->(1)->(2)->(3)->(4)->__NULL__

Here we have a singly linked list. The node containing zero (the `head` node) maintains a reference (or pointer) to the node containing one and the node containing one maintains a pointer to the node containing two, and so on.

_Aside, here is a visualization of a doubly linked list, notice that each node, in addition to its next pointer also carries a pointer to the value previous to it. For most of our discussion in the README we will use the a singly linked list, but a doubly linked list code example is in this project as well._

__NULL__<-(0)<->(1)<->(2)<->(3)<->(4)->__NULL__

As mentioned earlier, in addition to a LinkedList being a collection of containers it also maintains a reference of which container is the first container (the node containing zero in the above example) and which is last container (the node containing four above). These nodes are called the `head` and `tail` respectively. 

### LinkedList CRUD

By keeping references to head, tail, and length accurate new items may very quickly be added to the ends of a LinkedList, with a big O of 1 as a matter of fact.

Traversing a LinkedList is as easy as grabbing the head node of the LinkedList and moving to the node's `next` property until that property is null. This method has a big O of N however.

```javascript
let n = linkedList.head // `head` is the node that the LinkedList uses as the first container (above example is 0)
while(n){ // when n equals null iterations will cease 
	console.log(n.value) // 0,1,2,3,4 (as iterations occur)
	n = n.next
}
```

LinkedLists get more complex when adding or removing items in the middle. Generally speaking it is a game of grabbing reference nodes around the spot you wish to manipulate and rearranging pointers.

For example, let's say you have the following LinkedList.

(10)->(11)->(13)->(14)->(15)->__NULL__

If you wanted to insert a node with the value of 12 between nodes 11 and 13 you would need to grab reference to those nodes and set the 11 node's `next` property to the 12 node and set the 12 node's `next` property to the 13 node. Now the LinkedList will look like:

(10)->(11)->(12)->(13)->(14)->(15)->__NULL__

Now, let's say you wanted to delete the newly placed 12 node. First, you would want to grab references to the 11 and 13 node, then you would want to set the 11 node's next property to the 13 node. Depending on how garbage collection works in the language you are using you should also remove the next pointer from the 12 node, and possibly explicitly release it from memory (not required in javascript). Now you are back to this:

(10)->(11)->(13)->(14)->(15)->__NULL__

### LinkedList Interview Questions

_1. Create a LinkedList and reverse and LinkedList._

The concepts for creating a LinkedList are covered above, for reversing a LinkedList there are some tricky bits we should discuss. The operation follows a similar path to that of basic traversal. Let's use one of examples from before to illustrate.

(10)->(11)->(12)->(13)->(14)->(15)->__NULL__

We will create a few reference place holders for our starting point (starting from our current head soon to be tail).

```javascript
let leader = this.head 
let follower = leader.next
```

Once our reference holders are in place we begin our loop.

```javascript
while(follower) {...}
```

We designate `follower` as our truthy check because we know that our tail (soon to be head) is the node with a `null` next property.

Once inside the loop we create yet another reference to the follower node's `next` property.

```javascript
// inside while loop
// this will never result in a null pointer error since we always check follower before entering the loop
const tmp = follower.next 
```

We have done quite a bit by this point so let's look at what we have on our hands.

_LEADER: (10)->_

_FOLLOWER: (11)->_

_TMP: (12)_

Now for the reversal. Set `follower.next` to point at leader.

_(10)<->(11) X (12)->_

Now the 10 node points to the 11 node and 11 node points to the 10 node. We have removed all references to the 12 node, but don't worry we still have a handle to it in the form of the `tmp` variable.

Now we assign `leader = follower` and `follower = tmp`. Let's follow the loop through one more time now that the data structure looks like this:

(10)<->(11) X (12)->(13)->(14)->(15)->__NULL__

The 11 node is the leader, the 12 node is the follower and the 13 node is the `tmp`. 

Now we set the 12 node's (`follower`) `next` property to be the 11 node (`leader`). Now our data structure looks like this:

(10)<->(11)<-(12) X (13)->(14)->(15)->__NULL__

You can likely see a pattern emerging now. We continue this pattern until follower is `null`. We then swap the head for the current leader. This is a very clever trick as it takes care of the moving of the leader pointer inside the loop just after reassignment. __This part is tricky and took me a while to comprehend!__.

_Note: At the very beginning just after assigning the original leader reference to the head go ahead and set the LinkedList's tail to the head_

Please review the code as it paints a better picture.
