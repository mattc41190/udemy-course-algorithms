// Get first recurring item in a list

const arrSolve = () => {
	const arr = [3,2,3,5,1,2,3,5,1,2,4]
	const previouslyFound = []
	for (let i = 0; i < arr.length; i++) {
		const element = arr[i]
		// Consider the "Big O" of using includes -- (N)
		if (previouslyFound.includes(element)) {
			console.log(element);
			break
		}
		previouslyFound.push(element)
	}
}

const mapSolve = () => {
	const arr = [55,3,2,55,3,5,1,2,3,5,1,2,4]
	const map = {}
	for (let i = 0; i < arr.length; i++) {
		const element = arr[i]
				// Consider the "Big O" of using a map lookup -- (1)
		if (map[element]) {
			console.log(element);
			break
		}
		map[element] = true
	}
}

// arrSolve()
// mapSolve()

