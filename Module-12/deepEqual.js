function deepEqual(obj1,obj2){
	
	if(typeof obj1 === 'object' && typeof obj2 === 'object'){
		let c = 0
		const obj1_keys = Object.keys(obj1)
		const obj2_keys = Object.keys(obj2)
		for(let i = 0; i < obj1_keys.length; i++){
			for(let j = 0; j < obj2_keys.length;j++){
				if(deepEqual(obj1[obj1_keys[i]],obj2[obj2_keys[j]])){
					c++
					break
				}
			}
		}
		if(c === obj1_keys.length && c === obj2_keys.length)
			return true
		else
			return false
	}
	else
		return obj1 === obj2
}

const sample1 = {
	a:"Hello",
	b:"World"
}

const sample2 = {
	a:"Hello",
	b:"World"
}

const sample3 = {
	a:"Hello",
	b:"World",
	obj: {
		x:"Harry",
		y:"Potter",
	}
}

const sample4 = {
	a:"Hello",
	b:"World",
	obj: {
		x:"Harry",
		y:"Potter",
	}
}

const sample5 = {
	a:"Hello",
	
	obj: {
		x:"Harry",
		y:"Potter",
	}
}

console.log(deepEqual(0,0))
console.log(deepEqual(sample1,sample2))
console.log(deepEqual(sample1,sample1))
console.log(deepEqual(sample1,sample5))
console.log(deepEqual(sample3,sample2))
console.log(deepEqual(sample3,sample4))






