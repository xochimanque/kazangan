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
const elementsToHide = document.querySelectorAll('header, footer, .day, .headcont');
const timeToDisappear = 0.5 * 1000;

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

// Function to detect iOS devices
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Function to disable a specific CSS media query
function disableMediaQuery(query) {
    for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i];
        try {
            // Check if the sheet has CSS rules
            if (!sheet.cssRules) continue;

            // Iterate over each rule in the stylesheet
            for (let j = 0; j < sheet.cssRules.length; j++) {
                const rule = sheet.cssRules[j];

                // Check if the rule is a media rule
                if (rule.media && rule.media.mediaText === query) {
                    // Disable the media query by removing the rule
                    sheet.deleteRule(j);
                    j--; // Decrement index to account for the removed rule
                }
            }
        } catch (e) {
            // Handle potential CORS errors silently
            console.error('Error accessing stylesheet:', e);
        }
    }
}

// Function to adjust interlinear spacing for tanka tag
function adjustTankaSpacing() {
    const tankaElements = document.querySelectorAll('tanka');
    tankaElements.forEach(el => {
        el.style.lineHeight = '0.6em'; // Adjust the line height as needed
    });
}

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if the device is iOS
    if (isIOS()) {
        // Disable the specific media query
        disableMediaQuery('(max-width: 480px)');
        adjustTankaSpacing();
    }
});
