let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
let week = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
let liTag = document.getElementsByTagName("li");
let liMsg = document.getElementsByClassName("msg-title");
let liArrow = document.getElementsByClassName("arrow");
let ulTag = document.getElementsByTagName("ul");
let liTick = document.getElementsByClassName("tick-img");
let liEdit = document.getElementsByClassName("edit");
let liDelete = document.getElementsByClassName("delete");
let htmlText =
  '<li><span class="blank"></span><span class="tick"><img class="tick-img" src="/img/tick.svg" alt="a tick mark"></span><span class="msg-title"><div class="event-date"></div></span><span class="arrow"><img src="/img/next.svg" alt="arrow to open extra options"></span><span class="edit"></span><span class="delete"></span></li>';
if (localStorage.length == 0) {
  var dataAray = [];
} else {
  var dataAray = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < dataAray.length; i++) {
    ulTag[0].innerHTML += htmlText;
  }
}

//loop through all ils' and add onclick handlers
function addOnClick() {
  for (let i = 0; i < liTag.length; i++) {
    liMsg[i].setAttribute("onclick", "openLi(" + i + ")");
    liMsg[i].setAttribute("id", "msg" + i);
    document.getElementById("msg" + i).innerText = dataAray[i][0];
    document.getElementById("msg" + i).innerHTML =
      liMsg[i].innerHTML +
      "<div class='event-date'>" +
      dataAray[i][1] +
      "</div>";
    liArrow[i].setAttribute("onclick", "openLi(" + i + ")");
    liTick[i].setAttribute("onclick", "tickOff(" + i + ")");
    liEdit[i].setAttribute("onclick", "editList(" + i + ")");
    liDelete[i].setAttribute("onclick", "deleteList(" + i + ")");
  }
  localStorage.setItem("data", JSON.stringify(dataAray));
}
addOnClick();

//toggle open and close of list items
function openLi(liNum) {
  liTag[liNum].classList.toggle("li-open");
  //close other open list items
  let j;
  for (j = 0; j < liTag.length; j++) {
    if (!(j == liNum)) {
      liTag[j].setAttribute("class", "");
    }
  }
}

function tickOff(liNum) {
  liMsg[liNum].classList.toggle("ticked");
  if (liMsg[liNum].className == "msg-title ticked") {
    liTick[liNum].src = "/img/ticked.svg";
  } else {
    liTick[liNum].src = "/img/tick.svg";
  }
}

function editList(liNum) {
  document
    .getElementsByTagName("form")[0]
    .setAttribute("onsubmit", "return updateData(" + liNum + ")");
  document
    .getElementById("back-arrow")
    .setAttribute("onclick", "backEdit(" + liNum + ")");
  document.getElementById("form-heading").innerText = "EDIT EVENT";
  document.getElementById("form-name").value = dataAray[liNum][0];
  document.getElementById("event-date").value = dataAray[liNum][1];
  showForm();
}

function updateData(liNum) {
  hideForm();
  dataAray[liNum][0] = document.getElementById("form-name").value;
  dataAray[liNum][1] = document.getElementById("event-date").value;
  clearFormInput();
  openLi(liNum);
  addOnClick();
  return false;
}

function deleteList(liNum) {
  liTag[liNum].remove();
  dataAray.splice(liNum, 1);
  addOnClick();
}

let today = new Date();
function updateDate() {
  let dateEl = document.getElementById("date");
  let monthEl = document.getElementById("month");
  let yearEl = document.getElementById("year");
  let dayOfWeek = document.getElementById("day-of-week");
  dateEl.innerText = today.getDate();
  monthEl.innerText = months[today.getMonth()];
  yearEl.innerText = today.getFullYear();
  dayOfWeek.innerText = week[today.getDay() - 1];
}

updateDate();

function creatNewLi(addDate, addTitle) {
  ulTag[0].innerHTML += htmlText;
  addData(addTitle, addDate);
  addOnClick();
}

function newForm() {
  document.getElementById("form-heading").innerText = "NEW EVENT";
  document.getElementById("back-arrow").setAttribute("onclick", "hideForm()");
  document
    .getElementsByTagName("form")[0]
    .setAttribute("onsubmit", "return submitForm()");
  showForm();
}

function showForm() {
  document.getElementById("overlay").style.display = "unset";
  document.getElementById("darken").style.display = "unset";
}
function hideForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("darken").style.display = "none";
}

function submitForm() {
  let newTitle = document.getElementById("form-name").value;
  let newDate = document.getElementById("event-date").value;
  if (testStr(newTitle)) {
    creatNewLi(newDate, newTitle);
    hideForm();
    clearFormInput();
    return false;
  }
  return false;
}

function addData(titleStr, dateStr) {
  dataAray.push([titleStr, dateStr]);
}

function readData(liNum) {
  return dataAray[liNum][0];
}

function clearFormInput() {
  document.getElementById("form-name").value = "";
  document.getElementById("event-date").value = "";
}

function backEdit(liNum) {
  clearFormInput();
  hideForm();
  openLi(liNum);
}

function testStr(str) {
  if (!(typeof str == "string") || str.length == 0) {
    alert("No Event title has been entered");
    return false;
  } else {
    return true;
  }
}
