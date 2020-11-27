//na nastepnych zajeciach async/await, try catch, oraz reduce jako metoda na arr

//zadanie: maskymalnie skrócić kod

const allArr = [];

(function getData() {
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
})();

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
    let users = ["--wybierz--"];
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
}

//f. pozwalająca wyświetlić wszystkie dostępne zadania (ukończone - true, lub nieukończone - false)
function showAll(bool) {
    clearField(bool);
    const temp = allArr.filter((item) => item.completed === bool);
    createElement(temp, bool);

    //przywraca uzytkownika do stanu wyjsciowego
    let selectField = "";
    bool
        ? (selectField = document.getElementById("selectUserTrue"))
        : (selectField = document.getElementById("selectUserFalse"));
    selectField.value = "--wybierz--";
}

// wyszukiwanie po opisie taska w polu input
function search(value, bool) {
    // spr czy sprawdzamy taski ukonczone czy nie oraz czy wybrano usera
    let inputField = "";
    let selectField = "";
    if (bool) {
        inputField = document.getElementById("inputTitleTrue");
        selectField = document.getElementById("selectUserTrue").value;
    } else {
        inputField = document.getElementById("inputTitleFalse");
        selectField = document.getElementById("selectUserFalse").value;
    }
    inputField.value = "";

    //filtrowanie po stanie ukonczenia i wartosci zczytanej z input
    let searchResult = allArr.filter(
        (item) => item.completed === bool && item.title.search(value) > -1
    );

    //dodatkowe filtrowanie jesli wybrano uzytkownika
    let searchResult2;
    if (selectField > 0) {
        searchResult2 = searchResult.filter(
            (item) => item.userId == selectField
        );
    } else {
        searchResult2 = searchResult;
    }

    // console.log(`user ${selectField}`, searchResult2);
    clearField(bool);
    createElement(searchResult2, bool);
}
