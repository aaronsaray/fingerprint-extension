# Checker Chrome Extension

This is a security-based chrome extension I have installed locally.  You can learn to [install unpacked extensions here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) but you probably shouldn't do this unless you know what you're doing.

This is a **work in progress** and for my internal use only.  Feel free to use it, but I will not be accepting any feature requests at this time.

## What it does

Checks for the following at the domain of the page you're visting (or loading):

- /phpinfo.php
- /robots.txt

Shows whether these exist in a popup for the extension.  Extension indicator turns white when found.

Note this does not check all web requests. Instead, it checks the navigation - which is basically the top-level request you've made.

## Todo
- [ ] handle cors request for head
- [ ] display content in popup
- [ ] time-based expiration of cache
- [ ] make checks a group of async tasks instead of awaiting each one (make sure not to throttle, though)
- [ ] add more checks
