let changeColor = document.getElementById("changeColor");
let seeOrders = document.getElementById("seeOrders");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['transactions.js'],
  });
});

// When the button is clicked, inject setPageBackgroundColor into current page
seeOrders.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['orders.js'],
    });
    
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['table.css'],
    });

  
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
