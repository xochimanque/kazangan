// JavaScript for furigana colours
document.getElementById('defuriganify').addEventListener('click', function () {
    var rtElements = document.querySelectorAll('rt');
    var Button = document.getElementById('defuriganify');
    rtElements.forEach(function (rtElement) {
        var currentColor = rgbToHex(getComputedStyle(rtElement).color);
        var currentButtonColor = rgbToHex(getComputedStyle(Button).color);
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
