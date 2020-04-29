function countBs(str)
{
	var letter_count = 0;
	for (var i = 0; i < str.length; i++){
		if(str.charAt(i) == "B")
		{
			letter_count++;
		}
	}
	return letter_count;
}

function countChar(str,letter){
	var letter_count = 0;
	for (var i = 0; i < str.length; i++){
		if(str.charAt(i) == letter)
		{
			letter_count++;
		}
	}
	return letter_count;
}

console.log(countBs('abcdABCD'))
console.log(countBs('Barbaric'))
console.log(countBs('bbBB'))
console.log(countBs('HellO World!'))

console.log(countChar('Hello World!','O'))
console.log(countChar('Merci','a'))
console.log(countChar('Patronum','t'))




