document.addEventListener("DOMContentLoaded",() => {
	document.querySelectorAll("button").forEach(function(button){
		button.onclick = function(){
			const task = document.querySelector("#task_name").value
			let action = button.dataset.task
			if(action === "add"){
				let list = document.querySelector("ul") 
				let task_item = document.createElement("li")
            	task_item.innerHTML = task

            	task_item.setAttribute("id",task)

				list.appendChild(task_item)
			}
			else if(action === "del"){
				let list = document.querySelector("ul")
				let del_item = document.querySelector(`#${task}`)
				list.removeChild(del_item)
			}
			else{
				let check = document.querySelector(`#${task}`)
				check.style.color = "red" 
			}
			return false
		}
	})
})