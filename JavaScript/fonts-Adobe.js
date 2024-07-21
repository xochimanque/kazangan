// Adobe Fonts Embedding
(function (d) {
    var config = {
            kitId: 'mul0jtf',
            scriptTimeout: 3000,
            async: true
        },
        h = d.documentElement, t = setTimeout(function () {
            h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
        }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a;
    h.className += " wf-loading";
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
        a = this.readyState;
        if (f || a && a != "complete" && a != "loaded") return;
        f = true;
        clearTimeout(t);
        try {
            Typekit.load(config)
        } catch (e) {
        }
    };
    s.parentNode.insertBefore(tk, s)
})(document);

// Sniffing iOS

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
            console.error(e);
        }
    }
}

if (isIOS()) {
    disableMediaQuery('(max-width: 480px)');
}