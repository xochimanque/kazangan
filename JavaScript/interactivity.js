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
const timeToDisappear = 1 * 1000;

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
        el.style.lineHeight='1em';
        el.style.marginLeft= '0';
        el.style.paddingLeft = '1em'; // Adjust the line height as needed
    });
}

function setOpacityForFont(fontName, opacityValue) {
    const elements = document.querySelectorAll('.tanka, .tanka-container, .day, .headcont');

    elements.forEach(function(element) {
        const computedFontFamily = window.getComputedStyle(element).fontFamily;
        if (computedFontFamily.includes(fontName)) {
            element.style.opacity = opacityValue;
        }
    });
}

// Check if 'hot-tenkoinkk' font has already been loaded
if (localStorage.getItem('hotTenkoinkkFontLoaded')) {
    setOpacityForFont('hot-tenkoinkk', '1');
} else {
    // Wait for the 'hot-tenkoinkk' font to be ready
    document.fonts.load('1em hot-tenkoinkk').then(function() {
        setOpacityForFont('hot-tenkoinkk', '1');
        // Mark the font as loaded in local storage
        localStorage.setItem('hotTenkoinkkFontLoaded', 'true');
    });
}

// Wait for all fonts to be ready
document.fonts.ready.then(function() {
    // Set body opacity to 1 when all fonts are loaded
    document.body.style.setProperty('opacity', '1', 'important');

    // Set opacity for all other elements that do not use 'hot-tenkoinkk'
    const elements = document.querySelectorAll('.tanka, .tanka-container, .day, .headcont');

    elements.forEach(function(element) {
        const computedFontFamily = window.getComputedStyle(element).fontFamily;
        if (!computedFontFamily.includes('hot-tenkoinkk')) {
            element.style.opacity = '1';
        }
    });
});

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if the device is iOS
    if (isIOS()) {
        // Disable the specific media query
        disableMediaQuery('(max-width: 480px)');
        adjustTankaSpacing();
    }
});



