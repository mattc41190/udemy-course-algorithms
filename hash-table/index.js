function HashTable(size) {
	this.data = new Array(size)
}

HashTable.prototype._hash = function(key) {
	let hash = 0
	for(let i = 0 ; i < key.length; i++) {
		hash = (hash + key.charCodeAt(i) * i) % this.data.length
	}
	return hash
}

HashTable.prototype.set = function(k,v) {
	const i = this._hash(k)
	if(!this.data[i]) {
		this.data[i] = []
	}
	this.data[i].push([k,v])
}

HashTable.prototype.get = function(key) {
	const entry = this._hash(key)
	if (this.data[entry].length) {
		for (let i = 0; i < this.data[entry].length; i++) {
			if (this.data[entry][i][0] === key) {
					return this.data[entry][i][1]
			}
		}
	}
	return undefined
}

HashTable.prototype.keys = function() {
	const keys = []	
	this.data.forEach(bucketSet => {
		if (typeof bucketSet === undefined) {
			return
		}
		bucketSet.forEach(bucket => keys.push(bucket[0]))
	})
	return keys
}

const ht = new HashTable(2)

ht.set('grapes', 200)
ht.set('ginger snaps', 80)
ht.set('snap peas', 80)
ht.set('sweet peas', 80)

let item = ht.get('grapes')
console.log(item)
item = ht.get('ginger snaps')
console.log(item)

const keys = ht.keys()
console.log(keys)


/*============================*/
/*============================*/
/*  HOW A HASH FUNCTION WORKS */
/*============================*/
/*============================*/

// function HashTable(size) {
// 	this.data = new Array(size)
// }

// HashTable.prototype._hash = function(key) {
// 	let hash = 0
// 	for(let i = 0 ; i < key.length; i++) {
// 		console.log(`hash: ${hash} key.charCodeAt(i): ${key.charCodeAt(i)} i: ${i} this.data.length: ${this.data.length}`)
// 		hash = (hash + key.charCodeAt(i) * i) % this.data.length
// 		console.log(`hash after iteration ${i} is ${hash}`)
// 	}
// 	return hash
// }

// const ht = new HashTable(50)
// const hash = ht._hash('grapes')
// console.log(hash)

// i = 0
// hash: 0 key.charCodeAt(i): 103 i: 0 this.data.length: 50
// (0 + (103 * 0)) % 50 == 0 
// hash after iteration 0 is 0

// i = 1
// hash: 0 key.charCodeAt(i): 114 i: 1 this.data.length: 50
// (0 + (114 * 1)) % 50 == 14
// hash after iteration 1 is 14

// i = 2
// hash: 14 key.charCodeAt(i): 97 i: 2 this.data.length: 50
// (14 + (2 * 97)) % 50 == 8
// hash after iteration 2 is 8

// i = 3
// hash: 8 key.charCodeAt(i): 112 i: 3 this.data.length: 50
// (8 + (3 * 112)) % 50 == 44
// hash after iteration 3 is 44

// i = 4
// hash: 44 key.charCodeAt(i): 101 i: 4 this.data.length: 50
// (44 + (4 * 101)) % 50 == 48
// hash after iteration 4 is 48

// i = 5
// hash: 48 key.charCodeAt(i): 115 i: 5 this.data.length: 50
// (48 + (5 * 115)) % 50 == 23
// hash after iteration 5 is 23