// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utility functions for Computer Use Agent samples.
 * Shared helper functions and classes for Computer Use Agent samples.
 */

const fs = require("node:fs/promises");
const path = require("path");

/**
 * Enum for tracking the state of the simulated web search workflow.
 */
var SearchState;
(function (SearchState) {
  SearchState["INITIAL"] = "initial";
  SearchState["TYPED"] = "typed";
  SearchState["PRESSED_ENTER"] = "pressed_enter";
})(SearchState || (SearchState = {}));

/**
 * Convert an image file to a Base64-encoded string.
 *
 * @param imagePath - The path to the image file (e.g. 'image_file.png')
 * @returns A Base64-encoded string representing the image.
 * @throws Error if the provided file path does not exist or if there's an error reading the file.
 */
async function imageToBase64(imagePath) {
  try {
    const fileData = await fs.readFile(imagePath);
    return fileData.toString("base64");
  } catch (error) {
    throw new Error(`Error reading file '${imagePath}': ${error}`);
  }
}

/**
 * Load and convert screenshot images to base64 data URLs.
 *
 * @returns Dictionary mapping state names to screenshot info with filename and data URL
 * @throws Error if any required screenshot asset files are missing
 */
async function loadScreenshotAssets() {
  // Load demo screenshot images from assets directory
  // Flow: search page -> typed search -> search results
  const screenshotPaths = {
    browser_search: path.resolve(path.join(__dirname, "../assets/cua_browser_search.png")),
    search_typed: path.resolve(path.join(__dirname, "../assets/cua_search_typed.png")),
    search_results: path.resolve(path.join(__dirname, "../assets/cua_search_results.png")),
  };

  // Convert images to base64 data URLs with filenames
  const screenshots = {};
  const filenameMap = {
    browser_search: "cua_browser_search.png",
    search_typed: "cua_search_typed.png",
    search_results: "cua_search_results.png",
  };

  for (const [key, filePath] of Object.entries(screenshotPaths)) {
    try {
      const imageBase64 = await imageToBase64(filePath);
      screenshots[key] = {
        filename: filenameMap[key],
        url: `data:image/png;base64,${imageBase64}`,
      };
    } catch (error) {
      console.error(`Error: Missing required screenshot asset: ${error}`);
      throw error;
    }
  }

  return screenshots;
}

/**
 * Process a computer action and simulate its execution.
 *
 * In a real implementation, you might want to execute real browser operations
 * instead of just printing, take screenshots, and return actual screenshot data.
 *
 * @param action - The computer action to process (click, type, key press, etc.)
 * @param currentState - Current SearchState of the simulation
 * @param screenshots - Dictionary of screenshot data
 * @returns Tuple of [screenshot_info, updated_current_state]
 */
function handleComputerActionAndTakeScreenshot(action, currentState, screenshots) {
  console.log(`Executing computer action: ${action.type}`);

  // Track state transitions locally
  let updatedState = currentState;

  // State transitions based on actions
  if (action.type === "type" && action.text) {
    updatedState = SearchState.TYPED;
    console.log(`  Typing text: '${action.text}' - Simulating keyboard input`);
  }
  // Check for ENTER key press
  else if (
    (action.type === "key" || action.type === "keypress") &&
    action.keys &&
    (action.keys.includes("Return") || action.keys.includes("ENTER"))
  ) {
    updatedState = SearchState.PRESSED_ENTER;
    console.log("  -> Detected ENTER key press");
  }
  // Check for click after typing (alternative submit method)
  else if (action.type === "click" && updatedState === SearchState.TYPED) {
    updatedState = SearchState.PRESSED_ENTER;
    console.log("  -> Detected click after typing");
  }

  // Provide more realistic feedback based on action type
  if (action.x !== undefined && action.y !== undefined) {
    if (action.type === "click") {
      console.log(`  Click at (${action.x}, ${action.y}) - Simulating click on UI element`);
    } else if (action.type === "drag" && action.path) {
      const pathStr = action.path.map((p) => `(${p.x}, ${p.y})`).join(" -> ");
      console.log(`  Drag path: ${pathStr} - Simulating drag operation`);
    } else if (action.type === "scroll") {
      console.log(`  Scroll at (${action.x}, ${action.y}) - Simulating scroll action`);
    }
  }

  if (action.keys) {
    console.log(`  Key press: ${action.keys} - Simulating key combination`);
  }

  if (action.type === "screenshot") {
    console.log("  Taking screenshot - Capturing current screen state");
  }

  console.log(`  -> Action processed: ${action.type}`);

  // Determine screenshot based on current state
  let screenshotInfo;
  if (updatedState === SearchState.PRESSED_ENTER) {
    screenshotInfo = screenshots.search_results;
  } else if (updatedState === SearchState.TYPED) {
    screenshotInfo = screenshots.search_typed;
  } else {
    // SearchState.INITIAL
    screenshotInfo = screenshots.browser_search;
  }

  return [screenshotInfo, updatedState];
}

/**
 * Print the final output when the agent completes the task.
 *
 * @param response - The response object containing the agent's final output
 */
function printFinalOutput(response) {
  console.log("No computer calls found. Agent completed the task:");
  let finalOutput = "";

  for (const item of response.output) {
    if (item.type === "message" && item.content) {
      for (const part of item.content) {
        finalOutput += (part.text || part.refusal || "") + "\n";
      }
    }
  }

  console.log(`Final status: ${response.status}`);
  console.log(`Final output: ${finalOutput.trim()}`);
}

module.exports = {
  SearchState,
  imageToBase64,
  loadScreenshotAssets,
  handleComputerActionAndTakeScreenshot,
  printFinalOutput,
};
