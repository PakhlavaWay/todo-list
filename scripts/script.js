const items = document.querySelector('.main__items');
let taskItems;
const newReminder = document.querySelector('.main__new-reminder');
const newInfo = document.querySelector('.main__new-info');

const newTask = document.querySelector('.main__task-input');
const newDate = document.querySelector('.main__date-input');

const saveButton = document.querySelector('button');


const tasks = [

];

let count = 0;
let newTaskValue = newTask.value;
let newDateValue = newDate.value;


checkButtonState(newTaskValue, newDateValue, saveButton);

function renderTasks(tasks, numberOfTasks) {
  let previousIndex = numberOfTasks - 1;
  tasks.map( (task, index) => {
    if (index <= numberOfTasks && index > previousIndex) {
      items.insertAdjacentHTML('beforebegin',
      `<div class="main__item">
        <div class="main__item-left">
          <h2 class="main__title">${task.task}</h2>
          <p class="main__date">${task.date}</p>
        </div>
        <div class="close-container">
          <img src="./images/close.png" alt="close" class='main__close'>
        </div>
        <button class="edit-btn btn">Edit</button>
        
        <div class="main__new-info">
          <div class="main__task-info">
            <Label for=""> Task </Label> 
            <input type="text" placeholder="Add Task"   class="main__task-input">
          </div>
    
          <div class="main__task-info">
            <label for=""> Day & Time </label>
            <input type="text" placeholder="Add Date"   class="main__date-input">
          </div>
    
          <button class="save-btn btn">Save Task</button>
        </div>
      </div>
      `)
    }
  })
  taskItems = document.querySelectorAll('.main__item');
  removeTask(taskItems);
  editTask(taskItems);
  editModeToggle(taskItems);
  saveEditedTask(taskItems);
}



function saveEditedTask(taskItems) {
  let domTaskValue; 
  let domDateValue;
  
  let taskEditedValue = '';
  let dateEditedValue = '';
  
  taskItems.forEach( task => {
    
    task.addEventListener('click', (e) => {
      if (e.target.className.includes('main__item')) {
        domTaskValue = e.target.children[0].children[0].textContent;
        domDateValue = e.target.children[0].children[1].textContent;
      }
      
      if (e.target.className.includes('edit-btn')) {
        console.log(e.target.parentElement.children[3].children[2].classList.toggle('disabled'))
      }
      
      if (e.target.className.includes('main__task-input')) {
        e.target.addEventListener('input', (e) => {
          taskEditedValue = e.target.value;
          
          checkButtonState(taskEditedValue, dateEditedValue, e.target.parentElement.parentElement.children[2])
        })
      }
      
      if (e.target.className.includes('main__date-input')) {
        e.target.addEventListener('input', (e) => {
          dateEditedValue = e.target.value;
          
          checkButtonState(taskEditedValue, dateEditedValue, e.target.parentElement.parentElement.children[2])
        })
      }
      
      e.target.addEventListener('click', (e) => {
        let indexToDelete;
        if (e.target.className.includes('save-btn')) {
          tasks.map( (task, index) => {
            if (task.task === domTaskValue && task.date === domDateValue) {
              indexToDelete = index;
              tasks.splice(indexToDelete, 1, { id: task.id, task: taskEditedValue, date: dateEditedValue });
              
              e.target.parentElement.parentElement.children[0].children[0].textContent = taskEditedValue;
              e.target.parentElement.children[0].children[1].value = '';
              
              e.target.parentElement.parentElement.children[0].children[1].textContent = dateEditedValue;
              e.target.parentElement.children[1].children[1].value = '';
              
              e.target.parentElement.classList.toggle('active');
            }
          })
        }
      })    
    })
  } )
}

function editTask(tasks) {
  tasks.forEach( task => {
    task.addEventListener('click', (e) => {
      if (e.target.className.includes('main__item')) {
        task.classList.toggle('active');
        saveEditedTask(tasks);
      }
    }) 
  })
}

function editModeToggle(tasks) {
  tasks.forEach( item => {
    item.addEventListener('click', (e) => {
      if (e.target.className.includes('edit-btn')) {
        e.target.parentElement.children[3].classList.toggle('active');
        e.target.parentElement.classList.toggle('active');
        
        saveEditedTask(tasks);
      }
    })
  })
}

function checkButtonState(task, date, button) {
  if (task === '' || date === '') {
    button.disabled = true;
    button.classList.add('disabled');
  }
  else {
    button.disabled = false;
    button.classList.remove('disabled');
  }
}

newTask.addEventListener('input', (e) => {
  newTaskValue = e.target.value;
  
  checkButtonState(newTaskValue, newDateValue, saveButton);
})

newDate.addEventListener('input', (e) => {
  newDateValue = e.target.value;
  
  checkButtonState(newTaskValue, newDateValue, saveButton);
})

function addTask(task, date, tasks) {
  const id = Math.floor(Math.random() * 10000) + 1;
  tasks.push({ id, task, date });
  const newList = [...tasks, { id, task, date }];
  
  taskItems = document.querySelectorAll('.main__item');
  editTask(taskItems);
  editModeToggle(taskItems);
  renderTasks(newList, count++);
  saveEditedTask(taskItems);
}

function removeTask(tasks) {
  tasks.forEach(item => {
    item.addEventListener('click', (e) => {
      if(e.target.className === 'main__close') {
        e.target.parentElement.parentElement.remove();
      }
    })
  })
}

newReminder.addEventListener('click', (e) => {
  e.preventDefault();
  newInfo.classList.toggle('active');
});

saveButton.addEventListener('click', (e) => { 
  addTask(newTaskValue, newDateValue, tasks);
  newTask.value = '';
  newTaskValue = '';
  
  newDate.value = ''; 
  newDateValue = '';
  checkButtonState(newTaskValue, newDateValue, saveButton);
})


