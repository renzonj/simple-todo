(function() {
	'use strict';
	var tasker = {
		init: function() {
			this.cacheDom();
			this.bindEvents();
			this.evalTasklist();
		},
		cacheDom: function() {
			this.taskInput = document.getElementById("text_field");
			this.addBtn = document.getElementById("submit");
			this.tasklist = document.getElementById("tasks");
			this.tasklistChildren = this.tasklist.children;
			this.errorMessage = document.getElementById("error");
		},
		bindEvents: function() {
			this.addBtn.onclick = this.addTask.bind(this);
			this.taskInput.onkeypress = this.enterKey.bind(this);
		},
		evalTasklist: function() {
			var i, chkBox, delBtn;
			//BIND CLICK EVENTS TO ELEMENTS
			for (i = 0; i < this.tasklistChildren.length; i += 1) {
				//ADD CLICK EVENT TO CHECKBOXES
				chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
				chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);
				//ADD CLICK EVENT TO DELETE BUTTON
				delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
				delBtn.onclick = this.delTask.bind(this, i);
			}
            //ADD DRAGGABLE ATTRIBUTE TO TASK LIST ITEMS
			for (i = 0; i < this.tasklistChildren.length; i += 1) {
				this.tasklistChildren[i].setAttribute("draggable", "true");
			}
		},
		render: function() {
            var taskLi, taskDiv, taskChkbx, taskVal, taskBtn, taskTrsh, nameString;
            //BUILD HTML
            taskLi = document.createElement("li");
            taskLi.setAttribute("class", "task");
            // Retrieve the name from localStorage as a string
            nameString = localStorage.getItem('name');
            //print the name inside the title class
            document.getElementById('title').innerHTML = `${nameString}'s To Do List`;
            

        
            //CREATE DIV TO HOLD CHECKBOX AND USER TASK
            taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "task-info");
        
            //CHECKBOX
            taskChkbx = document.createElement("input");
            taskChkbx.setAttribute("type", "checkbox");
        
            //USER TASK
            taskVal = document.createTextNode(this.taskInput.value);
        
            //DELETE BUTTON
            taskBtn = document.createElement("button");
        
            //TRASH ICON
            taskTrsh = document.createElement("i");
            taskTrsh.setAttribute("class", "fa fa-trash-o");
        
            //INSTERT TRASH CAN INTO BUTTON
            taskBtn.appendChild(taskTrsh);
        
            //APPEND ELEMENTS TO TASKLI
            taskDiv.appendChild(taskChkbx);
            taskDiv.appendChild(taskVal);
            taskLi.appendChild(taskDiv);
            taskLi.appendChild(taskBtn);
        
            //ADD TASK TO TASK LIST
            this.tasklist.appendChild(taskLi);
        
            // INCREASE CONTAINER WIDTH BY 50PX
            document.querySelector(".container").style.height = (document.querySelector(".container").offsetHeight + 50) + "px";
        
            // Set the top to 20px if the container already reached the max height of the screen
            if (this.tasklist.offsetHeight >= 420) {
                document.querySelector(".container").style.top = "52%";
                document.querySelector(".container").style.height = "100%";
            }
        },
        

		completeTask: function(i, chkBox) {
            if (chkBox.checked) {
                i.style.textDecoration = "line-through";
                i.style.color = "grey";
                chkBox.style.filter = "grayscale(100%)";
            } else {
                this.incompleteTask(i);
            }
        },
		incompleteTask: function(i) {
			i.className = "task";
            i.style.textDecoration = "none";
            i.style.color = "black";
		},
		enterKey: function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				this.addTask();
			}
		},
		addTask: function() {
			var value = this.taskInput.value;
			this.errorMessage.style.display = "none";

			if (value === "") {
				this.error();
			} else {
				this.render();
				this.taskInput.value = "";
				this.evalTasklist();
			}
		},
		delTask: function(i) {
            document.querySelector(".container").style.height = (document.querySelector(".container").offsetHeight - 50) + "px";
			this.tasklist.children[i].remove();
			this.evalTasklist();
		},
		error: function() {
			this.errorMessage.style.display = "block";
		}
        
	};

	tasker.init();
}());

var nameString = localStorage.getItem('name');
document.getElementById('title').innerHTML = `${nameString}'s To Do List`;


const submitButton = document.querySelector('.home-btn');
submitButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});