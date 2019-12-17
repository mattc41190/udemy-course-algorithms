# Linked List

## What is this?

A Linked List (or Doubly Linked List) is a data strcuture made up of "Nodes" in which every Node maintains a reference to the Node that comes after it (and in the case of the Doubly Linked List the one that comes before it as well)

## Why make this?

So I have a place to refer to when reviewing for interviews or I am just interested in the Linked List data structure.

## How do I use this?

- Read the code 
- Run the code 
- Comprehend the code

## LinkedLists In Depth

### What makes up a LinkedList? 

A LinkedList is a collection of containers, and references to the first and last containers, as well as a count of all the items in the LinkedList, it does not matter what the containers happen to contain, all that matters is that in addition to carrying some value they also maintain a reference to other containers (also called "nodes"). Here is a simple visual explanation.

(0)->(1)->(2)->(3)->(4)->__NULL__

Here we have a singly linked list the node containing zero maintains a reference (or pointer) to the node containing one and the node containing one maintains a pointer to the node containing two, and so on.

_Aside, here is a visualization of a doubly linked list, notice that each node, in addition to its next pointer also carries a pointer to the value previous to it. For most of our discussion in the README we will use the a singly linked list, but a doubly linked list code example is in this project._

__NULL__<-(0)<->(1)<->(2)<->(3)<->(4)->__NULL__

As mentioned earlier, in addition to a LinkedList being a collection of containers it also maintains a reference of which container is the first container (the node containing zero in the above example) and which is last container (the node containing four above). 

### LinkedList CRUD

By keeping references to head, tail, and length accurate new items may be very quickly added to the LinkedList, big O of 1 as a matter of fact.

Traversing a LinkedList is as easy as grabbing the head node of the LinkedList and moving to the node's `next` property until that property is null.

```javascript
let n = linkedList.head // `head` is the node that the LinkedList uses a the first container (above example is 0)
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

Now, let's say you wanted to delete the newly placed 12 node. First, you would want to grab references to the 11 and 13 node, then you would want to set the 11 node's next property to the 13 node. Depending on how garbage collection works in the language you are using you should also remove the next pointer from the 12 node, and possibly explicitly release it from memory (not required in javascript). Now you are back to this

(10)->(11)->(13)->(14)->(15)->__NULL__

### LinkedList Interview Questions

_1. Create a LinkedList and reverse and LinkedList._

The concepts for creating a LinkedList are covered above, for reversing a LinkedList there are some tricky bits we should discuss.


