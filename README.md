<p align="center">
    <img width="128" height="128" src="gh-image.svg">
    <h1>Fingerprint Extension</h1>
</p>

This is a security-based chrome extension I have installed locally.  You can learn to [install unpacked extensions here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) but you probably shouldn't do this unless you know what you're doing.

This is a **work in progress** and for my internal use only.  Feel free to use it, but I will not be accepting any feature requests at this time.  Also, you should not copy this security model for your own extensions as it is very open by nature.

## What it does

Checks for the following at the domain of the page you're visiting (or loading):

- /phpinfo.php
- /robots.txt

Shows whether these exist in a popup for the extension.  Extension indicator turns white when found.

Note this does not check all web requests. Instead, it checks the navigation - which is basically the top-level request you've made.

## Technical Notes

### Extension Source

The extension source code - which should be loaded unpacked - is in `./extension-source`

### Test Servers

First - set up DNSMasq so anything `.test` maps to `127.0.0.1`

#### Server With Nothing

`php -S fingerprint-none.test:9999 -t test-server/fingerprint-none`

#### Server With Info (robots.txt)

`php -S fingerprint-robots.test:9999 -t test-server/fingerprint-robots`

#### Server With Warning (phpinfo.php)

`php -S fingerprint-phpinfo.test:9999 -t test-server/fingerprint-phpinfo`

#### Server With Everything

`php -S fingerprint-kitchen-sink.test:9999 -t test-server/fingerprint-kitchen-sink`

## Todo
- [ ] time-based expiration of cache
- [ ] make checks a group of async tasks instead of awaiting each one (make sure not to throttle, though)
- [ ] add more checks
- [ ] figure out why it's turning red on different tabs - I think the state is not tab dependent
- [ ] different color icon for warnings vs errors - ie things that are ok (robots.txt) and scary things (phpinfo)
