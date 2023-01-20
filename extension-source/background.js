async function scanForItems(domain, baseUrl, currentVersion) {
  const data = {
    cacheVersion: currentVersion,
    found: [],
  };

  const phpInfoFile = `${baseUrl}/phpinfo.php`;
  const phpInfoFileResult = await fetch(phpInfoFile, { method: 'HEAD' });
  if (phpInfoFileResult.ok) {
    data.found.push(phpInfoFile);
  }

  const robotsFile = `${baseUrl}/robots.txt`;
  const robotsFileResult = await fetch(robotsFile, { method: 'HEAD' });
  if (robotsFileResult.ok) {
    data.found.push(robotsFile);
  }

  return data;
}

async function processInitialCache(domain, baseUrl, currentVersion) {
  const incoming = await chrome.storage.local.get(domain);
  let cacheData = incoming[domain];

  if (cacheData && cacheData.cacheVersion === currentVersion) {
    // do nothing - maybe make a better reverse of this if statement - heh.
  } else {
    cacheData = await scanForItems(domain, baseUrl, currentVersion);
    await chrome.storage.local.set({ [domain]: cacheData });
  }

  return cacheData;
}

async function navigationCompleted(details) {
  await chrome.action.setIcon({ path: 'images/standard-icon.png' });

  const url = new URL(details.url);
  const domain = url.host;
  const baseUrl = `${url.protocol}//${domain}`;
  const currentVersion = chrome.runtime.getManifest().version;

  const results = await processInitialCache(domain, baseUrl, currentVersion);

  if (results.found.length) {
    chrome.action.setIcon({ path: 'images/found-icon.png' });
  }
}

chrome.webNavigation.onCompleted.addListener(navigationCompleted, {
  url: [
    {
      schemes: [
        'http',
        'https',
      ],
    },
  ],
});
