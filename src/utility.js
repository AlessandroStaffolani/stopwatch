

Number.prototype.noDecimals = function () {
    return this.toString().split('.')[0];
};

export function formatTimeValue(time) {
    return time < 10 ? '0' + time : time;
}

export function formatMilliSeconds(time) {
    let format = '';
    if (time < 10) {
        format = '0' + time;
    } else if (time > 100) {
        let timeString = '' + time;
        format = timeString.charAt(timeString.length - 2) + timeString.charAt(timeString.length - 1);
    } else {
        format = time;
    }
    return format;
}

export function calculateTimeAsObject(mills) {
    let milliseconds = mills;
    let seconds = ((milliseconds/1000)%60).noDecimals();
    let minutes = (milliseconds/(1000*60)%60).noDecimals();
    let hours = (milliseconds/(1000*60*60)).noDecimals();

    milliseconds = (milliseconds/10).noDecimals();

    return {
        milliseconds: formatMilliSeconds(milliseconds),
        seconds: formatTimeValue(seconds),
        minutes: formatTimeValue(minutes),
        hours: hours
    }
}