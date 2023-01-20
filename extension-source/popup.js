async function processDisplay(tabs) {
  const url = new URL(tabs[0].url);
  const domain = url.hostname;

  const incoming = await chrome.storage.local.get(domain);
  const cacheData = incoming[domain];

  // if you try this too fast, maybe this isn't set from the service worker
  if (cacheData && cacheData.found.length) {
    const resultsNodeNone = document.querySelector('.results-node-none');
    const resultsNode = document.querySelector('.results-node');
    const resultsItemNodeTemplate = document.getElementById('results-item-node-template');

    cacheData.found.forEach((foundUrl) => {
      const resultsItemNode = resultsItemNodeTemplate.content.cloneNode(true);
      const link = resultsItemNode.querySelector('a');
      link.setAttribute('href', foundUrl);
      link.textContent = foundUrl;
      resultsNode.appendChild(resultsItemNode);
    });

    resultsNodeNone.remove();
  }
}

chrome.tabs.query({ active: true }, processDisplay);
