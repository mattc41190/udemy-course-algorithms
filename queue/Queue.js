function Node(value) {
	this.value = value
	this.next = null
}

function Queue(value) {
	const n = new Node(value)
	this.front = n
	this.back = n
	this.length = 1
}

Queue.prototype.enqueue =  function(value) {
	const n = new Node(value)
	this.back.next = n 
	this.back = n 
	if (this.length === 0) {
		this.front = n
	}
	this.length++
}

Queue.prototype.dequeue =  function() {
	if (this.length === 0) {
		return null
	}
	const n = this.front
	if(this.front === this.back) {
		this.back = null
	} 
	this.front = this.front.next 
	this.length--
	return n
}

Queue.prototype.peek = function() {
	if(this.length) {
		console.log(this.front.value)
	}
}

Queue.prototype.print = function() {
	let msg = ''
	let n = this.front
	while(n) {
		msg += `(${n.value}) => `
		n = n.next
	}
	msg += 'NULL'
	console.log(msg)
	console.log(`FRONT: ${this.front ? this.front.value : 'NULL'}`)
	console.log(`BACK: ${this.back ? this.back.value : 'NULL'}`)
	
}


const q = new Queue(1)
q.enqueue(2)
q.enqueue(3)
q.enqueue(4)
q.print()
q.peek()
q.dequeue()
q.peek()
q.dequeue()
q.dequeue()
q.dequeue()
q.dequeue()
q.dequeue()
q.print()



