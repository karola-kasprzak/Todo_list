
const done = []
const notDone = []
const oneUserDone = []
const oneUserNotDone = []
fetch("https://jsonplaceholder.typicode.com/todos")
  .then(res => res.json())
  .then(res => {
    const doneTask = res.filter(task => task.completed === true)
    const notDoneTask = res.filter(task => task.completed === false)
    done.push(...doneTask)
    notDone.push(...notDoneTask)
    createOptions(doneTask, true)
    createOptions(notDoneTask, false)
    createElement(doneTask, true)
    createElement(notDoneTask, false)
  })

function createElement(tasks, bool) {
  tasks.forEach(task => {
    const div = document.createElement('div')
    div.setAttribute('class', 'container')
    const h4 = document.createElement('h4')
    h4.setAttribute('class', 'title')
    h4.innerText = task.title
    const span = document.createElement("span")
    if (bool) {
      span.setAttribute('class', "green")
      span.innerText = `Task zrobiony, przypisany do użytkownika ${task.userId}`
    } else {
      span.setAttribute('class', "red")
      span.innerText = `Task nie zrobiony, przypisany do użytkownika ${task.userId}`
    }
    div.appendChild(h4)
    div.appendChild(span)
    if (bool) {
      const taskDone = document.querySelector('.taskDone')
      taskDone.appendChild(div)
    } else {
      const taskNotDone = document.querySelector('.taskNotDone')
      taskNotDone.appendChild(div)
    }

  });

}
function createOptions(tasks, bool) {
  let users = []
  tasks.forEach(task => {
    if (users.every(element => element !== task.userId)) {
      users.push(task.userId)
    }
  })
  users.forEach(user => {
    const option = document.createElement('option')
    option.value = user
    option.innerText = `Użytkownik ${user}`
    if (bool) {
      const selectDone = document.getElementsByName('userIddone')
      selectDone[0].appendChild(option)
    } else {
      const selectNotDone = document.getElementsByName('userIdNotDone')
      selectNotDone[0].appendChild(option)
    }
  })
}
// funkcja która jest przypisana do selecta w cześci gdzie są taski na completed true
function selectUserDone(value) {
  const oneUser = done.filter(task => task.userId == value)
  oneUserDone.push(...oneUser)
  const taskDone = document.querySelector('.taskDone')
  taskDone.innerHTML = ''
  oneUser.forEach(taskOneUser => {
    const div = document.createElement('div')
    div.setAttribute('class', 'container')
    const h4 = document.createElement('h4')
    h4.setAttribute('class', 'title')
    h4.innerText = taskOneUser.title
    const span = document.createElement("span")
    span.setAttribute('class', "green")
    span.innerText = `Task zrobiony, przypisany do użytkownika ${taskOneUser.userId}`
    div.appendChild(h4)
    div.appendChild(span)
    taskDone.appendChild(div)
  })
}
function selectUserNotDone(value) {
  const oneUser = notDone.filter(task => task.userId == value)
  oneUserNotDone.push(...oneUser)
  const userIdNotDone = document.querySelector('.taskNotDone')
  userIdNotDone.innerHTML = ''
  oneUser.forEach(taskOneUser => {
    const div = document.createElement('div')
    div.setAttribute('class', 'container')
    const h4 = document.createElement('h4')
    h4.setAttribute('class', 'title')
    h4.innerText = taskOneUser.title
    const span = document.createElement("span")
    span.setAttribute('class', "red")
    span.innerText = `Task nie zrobiony, przypisany do użytkownika ${taskOneUser.userId}`
    div.appendChild(h4)
    div.appendChild(span)
    userIdNotDone.appendChild(div)
  })
}

function searchValue(val) {
  let searchTaskUsedVal = []
  if (oneUserDone.length > 0) {
    // filtrujemy tylko taski użytkownika wybranego w select 
    oneUserDone.forEach(task => {
      if (task.title.search(val) > 0) {
        searchTaskUsedVal.push(task)
      }
    })
    if (searchTaskUsedVal.length < 0) {
      const taskDone = document.querySelector('.taskDone')
      taskDone.innerHTML = ''
    }
    const taskDone = document.querySelector('.taskDone')
    taskDone.innerHTML = ''
    searchTaskUsedVal.forEach(taskOneUser => {
      const div = document.createElement('div')
      div.setAttribute('class', 'container')
      const h4 = document.createElement('h4')
      h4.setAttribute('class', 'title')
      h4.innerText = taskOneUser.title
      const span = document.createElement("span")
      span.setAttribute('class', "green")
      span.innerText = `Task zrobiony, przypisany do użytkownika ${taskOneUser.userId}`
      div.appendChild(h4)
      div.appendChild(span)
      taskDone.appendChild(div)
    })
  } else {
    // filtrujemy po wszytkich użytkowniakch 
  }
}