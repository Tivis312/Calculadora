const display = document.getElementById("display");
const historyList = document.getElementById("historyList");
const clickSound = document.getElementById("clickSound");

function sound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function press(value) {
    sound();
    display.value += value;
}

function clearDisplay() {
    sound();
    display.value = "";
}

function setTheme(t) {
    document.body.className = "tema-" + t;
    sound();
}

function loadHistory() {
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("history") || "[]");

    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function saveHistory(text) {
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(text);
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function clearHistory() {
    localStorage.removeItem("history");
    loadHistory();
}

function calculate() {
    sound();
    try {
        let exp = display.value.replace(/\^/g, "**");
        let result = eval(exp);
        saveHistory(display.value + " = " + result);
        display.value = result;
    } catch {
        display.value = "Erro";
    }
}

loadHistory();
