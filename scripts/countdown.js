(function(){
    var countdown = document.querySelector('.c');
    var DATETIME = new Date(countdown.getAttribute('datetime'));
    var intervalBound = false;
    var el = {
        weeks: document.querySelector('.d-w'),
        days: document.querySelector('.d-d'),
        hours: document.querySelector('.d-h'),
        minutes: document.querySelector('.d-m')
    };
    var updateCountdown = function updateCountdown(firstRun) {
        var milliseconds = DATETIME.getTime() - Date.now();
        var weeks = Math.floor(milliseconds / 604800000);
        milliseconds %= 604800000;
        el.weeks.textContent = weeks;
        var days = Math.floor(milliseconds / 86400000);
        milliseconds %= 86400000;
        el.days.textContent = days;
        var hours = Math.floor(milliseconds / 3600000);
        milliseconds %= 3600000;
        el.hours.textContent = hours;
        var minutes = Math.floor(milliseconds / 60000);
        milliseconds %= 60000;
        el.minutes.textContent = minutes;
        if (firstRun) {
            setTimeout(updateCountdown, milliseconds + 100);
        } else if (!intervalBound) {
            intervalBound = true;
            setInterval(updateCountdown, 60000);
        }
    };
    if (DATETIME.getTime() - Date.now() < 0) {
        document.getElementById("countdown").innerHTML = "<h2>Registration has now ended</h2>";
    } else {
        updateCountdown(true);
    }
}());
