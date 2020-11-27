//na nastepnych zajeciach async/await, try catch, oraz reduce jako metoda na arr

//zadanie: maskymalnie skrócić kod

const allArr = [];

fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((res) => {
        const doneTask = res.filter((task) => task.completed === true);
        const notDoneTask = res.filter((task) => task.completed === false);
        allArr.push(...res);
        createOptions(doneTask, true);
        createOptions(notDoneTask, false);
        createElement(doneTask, true);
        createElement(notDoneTask, false);
    });

//wyniki nie zdążą się ładować z fetch !! --> opakować fetch w fukcję, a następnie w fukcję asynchroniczną
let currentArrDone = allArr.filter((item) => item.completed === true);
console.log("currentArrDone", currentArrDone);
let currentArrNotDone = allArr.filter((item) => item.completed === false);
console.log("currentArrNotDone", currentArrNotDone);

//funkcja tworząca karty zadan, parametr 1 to lista obiektów, parametr 2 to boolean określający stan wykonania zadania
function createElement(tasks, bool) {
    tasks.forEach((task) => {
        const div = document.createElement("div");
        div.setAttribute("class", "task-container");
        const h4 = document.createElement("h4");
        h4.setAttribute("class", "title");
        h4.innerHTML = task.title;
        const p = document.createElement("p");
        p.innerHTML = `Użytkownik nr ${task.userId}`;
        const span = document.createElement("span");
        if (bool) {
            span.setAttribute("class", "green");
            span.innerHTML = "task zrobiony";
        } else {
            span.setAttribute("class", "red");
            span.innerHTML = "task nieukończony";
        }
        div.appendChild(h4);
        div.appendChild(p);
        div.appendChild(span);
        if (bool) {
            const taskDone = document.querySelector(".tasksDone");
            taskDone.appendChild(div);
        } else {
            const taskNotDone = document.querySelector(".tasksNotDone");
            taskNotDone.appendChild(div);
        }
    });
}

//funkcja tworząca listę select z użytkownikami
function createOptions(tasks, bool) {
    let users = [];
    tasks.forEach((task) => {
        if (users.every((element) => element !== task.userId)) {
            users.push(task.userId);
        }
    });

    users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user;
        option.innerText = `Użytkownik ${user}`;
        if (bool) {
            const select = document.getElementsByName("userIdNotDone")[0];
            select.appendChild(option);
        } else {
            const select = document.getElementsByName("userIdDone")[0];
            select.appendChild(option);
        }
    });
}

//funkcja czyszcząca wyświetlaną listę zadań; parametr pozwala wybrać czy są to taski ukończone (lewa str) czy nieukończone (prawa strona)
function clearField(bool) {
    let rootDiv = "";
    if (bool) {
        rootDiv = document.querySelector(".tasksDone");
    } else {
        rootDiv = document.querySelector(".tasksNotDone");
    }
    rootDiv.innerHTML = "";
}

//funkcja pozwalająca wyświetlić tylko taski użytkownika wybranego z listy select
function selectUser(value, bool) {
    clearField(bool);
    const user = parseInt(value);
    const userArr = allArr.filter(
        (item) => item.completed === bool && item.userId === user
    );
    createElement(userArr, bool);
    if (bool) {
        currentArrDone = userArr;
    } else {
        currentArrNotDone = userArr;
    }
}

//f. pozwalająca wyświetlić wszystkie dostępne zadania (ukończone - true, lub nieukończone - false)
function showAll(bool) {
    clearField(bool);
    const temp = allArr.filter((item) => item.completed === bool);
    createElement(temp, bool);
    if (bool) {
        currentArrDone = temp;
    } else {
        currentArrNotDone = temp;
    }
}

// wyszukiwanie po opisie taska w polu input
function search(value, bool) {
    let searchTaskUsedVal = [];
    if (bool) {
        currentArrDone.forEach((task) => {
            if (task.title.search(value) > 0) {
                searchTaskUsedVal.push(task);
            }
        });
    } else {
        currentArrNotDone.forEach((task) => {
            if (task.title.search(value) > 0) {
                searchTaskUsedVal.push(task);
            }
        });
    }
    console.log(value, bool);

    console.log("search -> currentArrNotDone", currentArrNotDone);
    console.log("search -> currentArrDone", currentArrDone);
    console.log("search -> searchTaskUsedVal", searchTaskUsedVal);
}
