const _ = require('lodash')
const BinarySearchTree = require('./BinarySearchTree.js').BinarySearchTree
const createJSONTree = require('./BinarySearchTree.js').createJSONTree

const deleteChildlessLeftChildJSON = {
	"value": 10,
	"left": null,
	"right": {
		"value": 15,
		"left": null,
		"right": null
	}
}

const deleteChildlessRightChildJSON = {
	"value": 10,
	"left": {
		"value": 5,
		"left": null,
		"right": null
	},
	"right": null
}

const deleteNodeWithLeftAndRightChildrenJSON = {
  "value": 10,
  "left": {
    "value": 4,
    "left": {
      "value": 2,
      "left": null,
      "right": {
        "value": 3,
        "left": null,
        "right": null
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

function deleteChildlessLeftChild() {
	const bst = new BinarySearchTree()
	bst.insert(10)
	bst.insert(5)
	bst.insert(15)
	bst.delete(5)
	const result = createJSONTree(bst.root)

	if (_.isEqual(deleteChildlessLeftChildJSON, result)) {
		console.log('PASSED\n')
		return
	}
	console.error('FAILED\n')
}

function deleteChildlessRightChild() {
	const bst = new BinarySearchTree()
	bst.insert(10)
	bst.insert(5)
	bst.insert(15)
	bst.delete(15)
	const result = createJSONTree(bst.root)

	if (_.isEqual(deleteChildlessRightChildJSON, result)) {
		console.log('PASSED\n')
		return
	}
	console.error('FAILED\n')
}

function deleteNodeWithLeftAndRightChildren() {
	const bst = new BinarySearchTree()
	bst.insert(10)
	bst.insert(5)
	bst.insert(2)
	bst.insert(3)
	bst.insert(4)
	bst.insert(6)
	bst.insert(15)


	console.log('-------------');
	bst.print()
	console.log('-------------');


	bst.delete(5)
	const result = createJSONTree(bst.root)

	if (_.isEqual(deleteNodeWithLeftAndRightChildrenJSON, result)) {
		console.log('PASSED\n')
		return
	}
	console.error('FAILED\n')
}

// deleteChildlessLeftChild()
// deleteChildlessRightChild()
deleteNodeWithLeftAndRightChildren()