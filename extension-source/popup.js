function addItems(items, containerSelector) {
  const container = document.querySelector(containerSelector);
  const resultsNode = container.querySelector('.results-node');
  const resultsItemNodeTemplate = document.getElementById('results-item-node-template');

  items.forEach((foundUrl) => {
    const resultsItemNode = resultsItemNodeTemplate.content.cloneNode(true);
    const link = resultsItemNode.querySelector('a');
    link.setAttribute('href', foundUrl);
    link.textContent = foundUrl;
    resultsNode.appendChild(resultsItemNode);
  });

  container.classList.remove('d-none');
}

async function processDisplay(tabs) {
  const url = new URL(tabs[0].url);
  const domain = url.host;

  const incoming = await chrome.storage.local.get(domain);
  const cacheData = incoming[domain];

  // if you try this too fast, maybe this isn't set from the service worker
  if (cacheData) {
    const hasWarning = !!cacheData.found.warn.length;
    const hasInfo = !!cacheData.found.info.length;

    if (hasWarning) {
      addItems(cacheData.found.warn, '#results-node-warn');
    }
    if (hasInfo) {
      addItems(cacheData.found.info, '#results-node-info');
    }

    if (hasWarning || hasInfo) {
      document.querySelector('.results-node-none').classList.add('d-none');
    }
  }
}

chrome.tabs.query({ active: true }, processDisplay);
