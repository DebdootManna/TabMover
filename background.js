// Listen for keyboard shortcut commands
chrome.commands.onCommand.addListener((command) => {
  // Identify the command and call the appropriate function
  if (command === "move-tab-left") {
    moveTabLeft();
  } else if (command === "move-tab-right") {
    moveTabRight();
  }
});

/**
 * Moves the currently active tab one position to the left.
 */
function moveTabLeft() {
  // Get the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      // Move the tab one position to the left, if it's not already at the beginning
      if (currentTab.index > 0) {
        chrome.tabs.move(currentTab.id, { index: currentTab.index - 1 });
      }
    }
  });
}

/**
 * Moves the currently active tab one position to the right.
 */
function moveTabRight() {
  // Get the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      // Move the tab one position to the right
      // The index is 0-based, so we don't need to check for the end
      chrome.tabs.move(currentTab.id, { index: currentTab.index + 1 });
    }
  });
}
