document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
});  



let now = () => (new Date()).getTime();
let intervalId;
let timerExists = false;
let error = false;
const timeSettings = document.getElementById('timeValue');
const timerButton = document.getElementById('setTimerButton');
let minutes;
let additionalTime;
let countDownDate;
let distance;
let resting = false;
console.log(alarm);


function timerIntake() {
    // Update the minutes variable every time the button is pressed
    minutes = timeSettings.value;
    if (!(minutes <= 0)) {
        error = false;
        additionalTime = (minutes * 60 * 1000) + 1000;
    } else {
        error = true;
        window.alert('Input more than 0 minutes');
    }
    console.log(`Mins: ${minutes}`);
}

function timerSetter() {
    timerIntake(); // Ensure minutes are updated before setting the countdown
    if (!error) {
        countDownDate = new Date(now() + additionalTime); // Set the countdown end date
        console.log(`Countdown set to: ${countDownDate}`);
        interval();
    };
};

function startStop() {
    if (timerExists) {
        clearInterval(intervalId);
    } else if (!timerExists) {

    }
};

function work() {
    document.getElementById("timerText").innerText = "Work Time";
    resting = false;
    timerSetter();
};

function rest() {
    document.getElementById("timerText").innerText = "Break Time";
    resting = true;
    timerSetter();
};


// Update the countdown every second
function interval() {
    intervalId = setInterval(function() {
        timerExists = true
        distance = countDownDate - now(); // remaining time
        // days, hours, minutes, and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer").innerHTML = `${days}d ${hours}h ${mins}m ${seconds}s`;
        console.log(`Mins: ${minutes}`)
        console.log(`Milliseconds until end: ${distance}`)

        if (distance < 0) {
            clearInterval(intervalId); // Stop the countdown
            alarm.play();
            timerExists = false;
            if (!resting) {
                rest();
            } else if (resting) {
                work();
            }
        }
    }, 1000);
}

timerButton.addEventListener('click', timerSetter);