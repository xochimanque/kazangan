// JavaScript for furigana colours
document.getElementById('defuriganify').addEventListener('click', function () {
    var rtElements = document.querySelectorAll('rt');
    var Button = document.getElementById('defuriganify');
    rtElements.forEach(function (rtElement) {
        var currentColor = rgbToHex(getComputedStyle(rtElement).color);
        if (currentColor === '#273800') {
            rtElement.style.color = 'transparent';
            Button.style.color = '#7c745f';
        } else {
            rtElement.style.color = '#273800';
            Button.style.color = '#273800';
        }

    });
});

function rgbToHex(rgb) {
    var result = rgb.match(/\d+/g).map(function (x) {
        var hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });
    return '#' + result.join('');
}

let timeout;
let timerActive= false;
const elementsToHide = document.querySelectorAll('header, footer, .day');
const timeToDisappear = 3 * 1000;

function resetTimer() {
    if (!timerActive) return;
    clearTimeout(timeout);
    elementsToHide.forEach(element => element.classList.remove('hidden'));
    document.body.classList.remove('hidden-cursor');
    timeout = setTimeout(() => {
        elementsToHide.forEach(element => element.classList.add('hidden'));
        document.body.classList.add('hidden-cursor');
    }, timeToDisappear);
}

function toggleTimer() {
    timerActive = !timerActive;
    if (timerActive) {
        resetTimer();
    } else {
        clearTimeout(timeout);
        elementsToHide.forEach(element => element.classList.remove('hidden'));
        document.body.classList.remove('hidden-cursor');
    }
}
document.getElementById('toggleButton').addEventListener('click', toggleTimer);
document.addEventListener('mousemove', resetTimer);
//document.addEventListener('keydown', resetTimer);
document.addEventListener('touchstart', resetTimer);
document.addEventListener('touchmove', resetTimer);

// Initialize the timer
resetTimer();
//Change Focus Button colour
document.getElementById('toggleButton').addEventListener('click', function () {
    var togButton = document.getElementById('toggleButton');
    if (timerActive===true) {
        togButton.style.color ='#273800';
    } else{
        togButton.style.color ='#7c745f';
    }

});
