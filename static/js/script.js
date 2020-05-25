let liTag = document.getElementsByTagName("il");
let liMsg = document.getElementsByClassName("msg-title");
let liArrow = document.getElementsByClassName("arrow");

//loop through ul and add onclick handlers
let i;
for (i = 0; i < liTag.length; i++) {
  liMsg[i].setAttribute("onclick", "openLi(" + i + ")");
  liArrow[i].setAttribute("onclick", "openLi(" + i + ")");
}

//toggle open and close of list items
function openLi(liNum) {
  liTag[liNum].classList.toggle("il-open");
  //close other open list items
  let j;
  for (j = 0; j < liTag.length; j++) {
    if (!(j == liNum)) {
      liTag[j].setAttribute("class", "");
    }
  }
}

let today = new Date();

function updateDate() {
  let dateEl = document.getElementById("date");
  let monthEl = document.getElementById("month");
  let yearEl = document.getElementById("year");
  let dayOfWeek = document.getElementById("day-of-week");
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
  dateEl.innerText = today.getDate();
  monthEl.innerText = months[today.getMonth()];
  yearEl.innerText = today.getFullYear();
  dayOfWeek.innerText = week[today.getDay() - 1];
}

updateDate();
