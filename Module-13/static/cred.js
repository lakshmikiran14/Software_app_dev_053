
function ValidateEmail(email) 
{	
	const check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	if (email.match(check))
		return true;
	return false;
}

function CheckPassword(password) 
{ 
	const check=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
	if(password.match(check)) 
		return true;
	return false;
}

document.addEventListener('DOMContentLoaded',function(){
	document.querySelector(".button").onclick = function(){
		const email = document.querySelector("#email").value
		const password = document.querySelector("#password").value

		var check_mail = ValidateEmail(email)
		var check_pw = CheckPassword(password)

		if(check_mail && check_pw) {
			console.log(true)
			document.querySelector("#error").innerhtml = ""
		}
		else {
			document.getElementById("error").innerHTML = "Incorrect email or password."
			// document.querySelector("#error").innerhtml = "Incorrect email or password."
			console.log(false)
			return false
		}
	}
})