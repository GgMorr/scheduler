/* Moment day format */
$("#currentDay").html(moment().format("L"));

$(document).ready(function () {
  console.log($(".saveBtn"))
});

var currentDay = document.getElementById("currentDay")
moment().day(7 | currentDay);

console.log(moment().date());
var dayofWeek = moment().day();
var dateofWeek = moment().date();
var day = moment().day(dayofWeek);

var currentDay2 = moment(day).format("dddd, MMMM Do YYYY, h:mm:ss a");
console.log(moment(day).format("dddd, MMM Do YYYY, h:mm:ss a"))

$(currentDay).append(currentDay);



var toDo = parseInt(localStorage.getItem("saved-event"));

if (!toDo) {
  toDo = ["", "", "", "", "", "", "", "", "",];
}
for (var i = 0; i < toDo.length; i++) {
  var eventId = parseInt($(".row").attr("id")) + i;
  $("textarea" + eventId).find("textarea").attr("time", JSON.stringify(moment().set("hour", (9 + i)).startOf("hour")));
};

function todaysDate() {
  var today = moment().format("dddd, MMMM, Do");
  $("#currentDay").append("<p>").text(today);

  if (today != parseInt(localStorage.getItem("day"))) {
    localStorage.setItem("day", JSON.stringify(today));
    $("textarea").each().text("");
    toDo = ["", "", "", "", "", "", "", "", ""];
    localStorage.setItem("saved-events", JSON.stringify(toDo));
  }
};


function eventTimer() {
  var currentTime = moment().startOf("hour");
  for (var i = 0; i < toDo.length; i++) {
    var eventId = parseInt($(".row").attr("id")) + i;
    var eventTime = parseInt($("textarea" + eventId).find("textarea").attr("time"));

    if (currentTime.isAfter(eventTime)) {
      $("textarea" + eventId).find("textarea").addClass("past")
    }
    else if (currentTime.isSame(eventTime)) {
      $("textarea" + eventId).find("textarea").addClass("present");
    }
    else if (currentTime.isBefore(eventTime)) {
      $("textarea" + eventId).find("textarea").addClass("future");
    }

  }
};

function loadEvents() {
  for (var i = 0; i < toDo.length; i++) {
    var eventId = parseInt($(".row").attr("id")) + i;
    $("textarea" + eventId).find("textarea").text(toDo[i]);
  };
};

$("i").on("click", function () {
  var eventDescription = $(this).parents(".row").find("textarea").val().trim();
  toDo.splice($(this).parents(".row").attr("id"), 1, eventDescription);
  localStorage.setItem("saved-events", JSON.stringify(toDo));

})
loadEvents();
eventTimer();

setInterval(todaysDate(), (1000 * 60 * 30))

