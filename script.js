


const sections = document.querySelectorAll(".feature-section");
const navButtons = document.querySelectorAll(".nav-btn");
const featureCards = document.querySelectorAll(".feature-card");




function showSection(sectionId) {

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const selectedSection = document.getElementById(sectionId);

    if (!selectedSection) return;

    selectedSection.classList.add("active");

    navButtons.forEach(button => {
        button.classList.remove("active");

        if (button.dataset.section === sectionId) {
            button.classList.add("active");
        }
    });
}

document.addEventListener("click", function (event) {

    const backButton = event.target.closest(".back-btn");

    if (backButton) {
        showSection("home");
        return;
    }

    const navigationElement = event.target.closest("[data-section]");

    if (navigationElement) {
        showSection(navigationElement.dataset.section);
    }
});



function createFeatureUI(sectionId, html) {

    const section = document.getElementById(sectionId);

    if (!section) return;


    const backButton = section.querySelector(".back-btn");

    section.innerHTML = "";

    if (backButton) {
        section.appendChild(backButton);
    }

    const featureContainer = document.createElement("div");

    featureContainer.innerHTML = html;

    section.appendChild(featureContainer);
}




createFeatureUI("todo", `
    <h2>My Todo List</h2>
    <p>Organize your tasks and stay productive.</p>

    <div class="feature-controls">
        <input type="text" id="taskInput"
            placeholder="Enter your task...">

        <button id="addTaskBtn">Add Task</button>
    </div>

    <ul id="taskList"></ul>
`);




createFeatureUI("planner", `
    <h2>Daily Planner</h2>
    <p>Plan your day hour by hour.</p>

    <div id="plannerList"></div>
`);




createFeatureUI("goals", `
    <h2>Daily Goals</h2>
    <p>Set your goals and track your progress.</p>

    <div class="feature-controls">
        <input type="text" id="goalInput"
            placeholder="Enter your daily goal...">

        <button id="addGoalBtn">Add Goal</button>
    </div>

    <h3 id="goalProgress">0 of 0 completed</h3>

    <ul id="goalList"></ul>
`);




createFeatureUI("pomodoro", `
    <h2>Pomodoro Timer</h2>
    <p id="timerMode">Work Session</p>

    <h1 id="timerDisplay">25:00</h1>

    <div class="feature-controls">
        <button id="startTimer">Start</button>
        <button id="pauseTimer">Pause</button>
        <button id="resetTimer">Reset</button>
    </div>
`);




createFeatureUI("quotes", `
    <h2>Daily Motivation</h2>

    <blockquote id="quoteText">
        Believe in yourself and keep going!
    </blockquote>

    <p id="quoteAuthor">Unknown</p>

    <button id="newQuoteBtn">New Quote</button>
`);



createFeatureUI("weather", `
    <h2>Weather Information</h2>

    <p id="weatherStatus">
        Click below to check your weather.
    </p>

    <h1 id="temperature">-- °C</h1>

    <h3 id="weatherCondition">--</h3>

    <p id="weatherLocation">Location: --</p>

    <p id="weatherHumidity">Humidity: --</p>

    <p id="weatherWind">Wind: --</p>

    <button id="getWeatherBtn">Get My Weather</button>
`);



const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        if (task.important) {
            li.classList.add("important");
        }

        const taskText = document.createElement("span");

        taskText.textContent = task.text;

        const actions = document.createElement("div");

        actions.className = "task-actions";

        actions.innerHTML = `
            <button data-action="complete" data-id="${task.id}">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button data-action="important" data-id="${task.id}">
                ${task.important ? "★" : "☆"}
            </button>

            <button data-action="delete" data-id="${task.id}">
                Delete
            </button>
        `;

        li.appendChild(taskText);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        important: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}


addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }
});


taskList.addEventListener("click", function (event) {

    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    if (action === "complete") {
        task.completed = !task.completed;
    }

    if (action === "important") {
        task.important = !task.important;
    }

    if (action === "delete") {
        tasks = tasks.filter(task => task.id !== id);
    }

    saveTasks();
    renderTasks();
});

renderTasks();




const plannerList = document.getElementById("plannerList");

const plannerHours = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM"
];

let plannerData =
    JSON.parse(localStorage.getItem("plannerData")) || {};


function savePlanner() {
    localStorage.setItem(
        "plannerData",
        JSON.stringify(plannerData)
    );
}


function renderPlanner() {

    plannerList.innerHTML = "";

    plannerHours.forEach(time => {

        const row = document.createElement("div");

        row.className = "planner-row";

        const label = document.createElement("label");

        label.textContent = time;

        const input = document.createElement("input");

        input.type = "text";
        input.placeholder = "Add your plan...";
        input.value = plannerData[time] || "";

        input.addEventListener("input", function () {

            plannerData[time] = input.value;

            savePlanner();
        });

        row.appendChild(label);
        row.appendChild(input);

        plannerList.appendChild(row);
    });
}

renderPlanner();



const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");
const goalProgress = document.getElementById("goalProgress");

let goals = JSON.parse(localStorage.getItem("goals")) || [];


function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}


function renderGoals() {

    goalList.innerHTML = "";

    goals.forEach(goal => {

        const li = document.createElement("li");

        li.className = "goal-item";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;

        checkbox.addEventListener("change", function () {

            goal.completed = checkbox.checked;

            saveGoals();
            renderGoals();
        });

        const text = document.createElement("span");

        text.textContent = goal.text;

        if (goal.completed) {
            text.style.textDecoration = "line-through";
            text.style.color = "#888";
        }

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {

            goals = goals.filter(item => item.id !== goal.id);

            saveGoals();
            renderGoals();
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);

        goalList.appendChild(li);
    });

    const completedGoals = goals.filter(
        goal => goal.completed
    ).length;

    goalProgress.textContent =
        `${completedGoals} of ${goals.length} completed`;
}


function addGoal() {

    const text = goalInput.value.trim();

    if (text === "") {
        alert("Please enter a goal!");
        return;
    }

    goals.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    saveGoals();
    renderGoals();

    goalInput.value = "";
}


addGoalBtn.addEventListener("click", addGoal);

goalInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addGoal();
    }
});

renderGoals();




const timerDisplay = document.getElementById("timerDisplay");
const timerMode = document.getElementById("timerMode");

const startTimer = document.getElementById("startTimer");
const pauseTimer = document.getElementById("pauseTimer");
const resetTimer = document.getElementById("resetTimer");

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let remainingTime = WORK_TIME;
let timerInterval = null;
let isWorkSession = true;


function updateTimerDisplay() {

    const minutes = Math.floor(remainingTime / 60);

    const seconds = remainingTime % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function startPomodoro() {

    if (timerInterval !== null) return;

    timerInterval = setInterval(function () {

        if (remainingTime > 0) {

            remainingTime--;

            updateTimerDisplay();

        } else {

            clearInterval(timerInterval);

            timerInterval = null;

            alert(
                isWorkSession
                    ? "Work session completed! Time for a break."
                    : "Break completed! Ready to focus?"
            );

            isWorkSession = !isWorkSession;

            remainingTime = isWorkSession
                ? WORK_TIME
                : BREAK_TIME;

            timerMode.textContent = isWorkSession
                ? "Work Session"
                : "Break Session";

            updateTimerDisplay();
        }

    }, 1000);
}


function pausePomodoro() {

    clearInterval(timerInterval);

    timerInterval = null;
}


function resetPomodoro() {

    pausePomodoro();

    isWorkSession = true;

    remainingTime = WORK_TIME;

    timerMode.textContent = "Work Session";

    updateTimerDisplay();
}


startTimer.addEventListener("click", startPomodoro);

pauseTimer.addEventListener("click", pausePomodoro);

resetTimer.addEventListener("click", resetPomodoro);

updateTimerDisplay();



const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");


async function getQuote() {

    quoteText.textContent = "Loading your motivation...";

    quoteAuthor.textContent = "";

    newQuoteBtn.disabled = true;

    try {

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch quote");
        }

        const data = await response.json();

        quoteText.textContent = `"${data.quote}"`;

        quoteAuthor.textContent = `— ${data.author}`;

    } catch (error) {

        quoteText.textContent =
            "Believe in yourself. Every small step counts.";

        quoteAuthor.textContent = "— FocusFlow";

        console.error(error);

    } finally {

        newQuoteBtn.disabled = false;
    }
}


newQuoteBtn.addEventListener("click", getQuote);

getQuote();



const getWeatherBtn = document.getElementById("getWeatherBtn");

const weatherStatus = document.getElementById("weatherStatus");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const weatherLocation = document.getElementById("weatherLocation");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");


function getWeatherDescription(code) {

    const weatherCodes = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Rime Fog",
        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Heavy Drizzle",
        61: "Light Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        71: "Light Snow",
        73: "Moderate Snow",
        75: "Heavy Snow",
        80: "Rain Showers",
        81: "Moderate Showers",
        82: "Heavy Showers",
        95: "Thunderstorm"
    };

    return weatherCodes[code] || "Unknown Weather";
}


async function fetchWeather(latitude, longitude) {

    weatherStatus.textContent = "Loading weather...";

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather API failed");
        }

        const data = await response.json();

        const current = data.current;

        temperature.textContent =
            `${current.temperature_2m} °C`;

        weatherCondition.textContent =
            getWeatherDescription(current.weather_code);

        weatherHumidity.textContent =
            `Humidity: ${current.relative_humidity_2m}%`;

        weatherWind.textContent =
            `Wind: ${current.wind_speed_10m} km/h`;

        weatherStatus.textContent = "Weather updated successfully!";

        weatherLocation.textContent =
            `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;

    } catch (error) {

        weatherStatus.textContent =
            "Unable to load weather. Please try again.";

        console.error(error);
    }
}


function getUserWeather() {

    if (!navigator.geolocation) {

        weatherStatus.textContent =
            "Geolocation is not supported by your browser.";

        return;
    }

    weatherStatus.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            fetchWeather(latitude, longitude);
        },

        function () {

            weatherStatus.textContent =
                "Location permission denied. Please allow location access.";
        }
    );
}


getWeatherBtn.addEventListener("click", getUserWeather);



const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");


function updateDateTime() {

    const now = new Date();

    if (currentDate) {

        currentDate.textContent =
            now.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    }

    if (currentTime) {

        currentTime.textContent =
            now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
    }
}


updateDateTime();

setInterval(updateDateTime, 1000);


// ==========================================
// 11. LIGHT AND DARK THEME
// ==========================================

const themeBtn = document.getElementById("themeBtn");

let savedTheme = localStorage.getItem("theme") || "light";


const themeStyles = document.createElement("style");

themeStyles.textContent = `

    body.dark-theme {
        background: #151a2d;
        color: #f5f5f5;
    }

    body.dark-theme .header,
    body.dark-theme .feature-section,
    body.dark-theme .feature-card {
        background: #252c43;
        color: white;
        border-color: #39415b;
    }

    body.dark-theme .feature-card h3,
    body.dark-theme .feature-section h2 {
        color: white;
    }

    body.dark-theme .feature-card p,
    body.dark-theme .feature-section p {
        color: #c0c5d5;
    }

    body.dark-theme .main-content {
        background: #151a2d;
    }

    body.dark-theme input {
        background: #303952;
        color: white;
        border: 1px solid #555;
    }

    body.dark-theme button {
        color: white;
    }

    body.dark-theme .nav-btn.active {
        background: #635bdb;
    }
`;

document.head.appendChild(themeStyles);


function applyTheme() {

    document.body.classList.toggle(
        "dark-theme",
        savedTheme === "dark"
    );

    if (themeBtn) {

        themeBtn.textContent =
            savedTheme === "dark"
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
    }
}


applyTheme();


if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        savedTheme =
            savedTheme === "light" ? "dark" : "light";

        localStorage.setItem("theme", savedTheme);

        applyTheme();
    });
}




function updateBackground() {

    const hour = new Date().getHours();

    let background;

if (hour >= 5 && hour < 11) {
    background = "url('assets/images/morning.jpg')";
}
else if (hour >= 11 && hour < 17) {
    background = "url('assets/images/afternoon.jpg')";
}
else if (hour >= 17 && hour < 20) {
    background = "url('assets/images/evening.jpg')";
}
else {
    background = "url('assets/images/night.jpg')";
}

if (savedTheme === "light") {
    document.body.style.backgroundImage = background;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}
}


updateBackground();

setInterval(updateBackground, 60000);



showSection("home");

console.log("FocusFlow Dashboard Loaded Successfully!");
