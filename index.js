var clock = document.querySelector("#clock");
var setHours = document.querySelector("#hours");
var setMinutes = document.querySelector("#minutes");
var setSeconds = document.querySelector("#seconds");
var setSession = document.querySelector("#am-pm");
var setAlarmButton = document.querySelector("#set-alarm-btn");
var alarmsList = document.querySelector("#alarms-list");
var alarms = [];

function currentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var session = "AM";

  if (hours > 12) {
    hours = hours - 12;
    session = "PM";
  }

  hours = hours < 10 ? "0" + hours : hours;
  hours = parseInt(hours);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var time = `${hours}:${minutes}:${seconds} ${session}`;
  clock.innerHTML = time;

  checkIfRinging(time);

  return time;
}
console.log(currentTime());

function addOptionsToSelect(start, end, element) {
  for (let i = start; i <= end; i++) {
    var option = document.createElement("option");
    option.value = i < 10 ? "0" + i : i;
    option.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(option);
  }
}

addOptionsToSelect(1, 12, setHours);
addOptionsToSelect(0, 59, setMinutes);
addOptionsToSelect(0, 59, setSeconds);

setAlarmButton.addEventListener("click", function (e) {
  e.preventDefault();
  var alarmHours = parseInt(setHours.value);
  var alarmMinutes = setMinutes.value;
  var alarmSeconds = setSeconds.value;
  var alarmSession = setSession.value;
  var alarmTime = `${alarmHours}:${alarmMinutes}:${alarmSeconds} ${alarmSession}`;
  alarms.push(alarmTime);

  addAlarmToList(alarmTime);
  console.log(alarmTime);
  console.log(alarms);
});

function checkIfRinging(time) {
  if (alarms.includes(time)) {
    alert("Time to get up pal...");
  }
}

function addAlarmToList(time) {
  var alarm = document.createElement("div");
  alarm.classList.add("alarm");
  alarm.innerHTML = `
    <span>${time}</span>
    <button class='delete-alarm'>Delete</button>
  `;
  alarmsList.prepend(alarm);

  var deleteBtn = document.querySelector(".delete-alarm");

  deleteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var alarmToRemove = e.target.parentElement;
    alarmToRemove.remove();

    var index = alarms.indexOf(time);
    alarms.splice(index, 1);
    console.log(index);
    console.log(alarms);
  });
}

setInterval(currentTime, 1000);
