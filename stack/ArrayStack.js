// Stack implemented using an array

function Stack(val) {
	this.arr = [val]
}

Stack.prototype.push =  function(val) {
	this.arr.push(val)
	return this
}

Stack.prototype.pop =  function() {
	return this.arr.pop()
}

Stack.prototype.peek = function() {
	if (this.arr.length) {
		console.log(this.arr[this.arr.length-1])
	}
}

const s =  new Stack(1)
s.push(2)
s.push(3)
s.pop()
s.peek()
