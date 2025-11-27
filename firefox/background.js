// Listen for keyboard shortcut commands
browser.commands.onCommand.addListener(async (command) => {
  // Identify the command and call the appropriate function
  if (command === "move-tab-left") {
    await moveTabLeft();
  } else if (command === "move-tab-right") {
    await moveTabRight();
  }
});

/**
 * Moves the currently active tab one position to the left.
 * Uses async/await with the browser.tabs API.
 */
async function moveTabLeft() {
  try {
    // Get the currently active tab in the current window
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });

    if (tabs.length > 0) {
      const currentTab = tabs[0];
      // If the tab is not the first one, move it to the left
      if (currentTab.index > 0) {
        await browser.tabs.move(currentTab.id, { index: currentTab.index - 1 });
      }
    }
  } catch (error) {
    console.error(`Error moving tab left: ${error}`);
  }
}

/**
 * Moves the currently active tab one position to the right.
 * Uses async/await with the browser.tabs API.
 */
async function moveTabRight() {
  try {
    // Get the currently active tab in the current window
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });

    if (tabs.length > 0) {
      const currentTab = tabs[0];
      // Move the tab one position to the right. The API handles the case where the index is out of bounds
      // by moving it to the end, so no need to check the upper limit.
      await browser.tabs.move(currentTab.id, { index: currentTab.index + 1 });
    }
  } catch (error) {
    console.error(`Error moving tab right: ${error}`);
  }
}
