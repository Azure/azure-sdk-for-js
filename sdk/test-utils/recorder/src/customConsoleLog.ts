// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { isBrowser } from "./utils";

// Converting content corresponding to all the console statements
// into (JSON.stringify)-ed content in record mode for browser tests.
//
// In browser, once the content to be recorded is ready, recordings
//  are supposed to be sent to the appropriate karma reporter(jsonToFileReporter)
//  in order to generate the corresponding recording file.
// The way to do this is by printing the recordings as JSON strings to `console.log()`.
// As a result, the console gets filled with lots of prints while recording.
//
// We solve this issue by
// - disabling the console.logs from karma and
// - by adding a custom console.log() which converts all the console statements into
//   console.log() with stringified JSON objects.
// - Handle all the console.logs with stringified JSON objects in karma.conf.js
//   as explained below.
//
// Karma.conf.js
// - jsonToFileReporter in karma.conf.js filters the JSON strings in console.logs.
// - Console logs with `.writeFile` property are captured and are written to a file(recordings).
// - The other console statements are captured and printed normally.
// - Example - console.warn("hello"); -> console.log({ warn: "hello" });
// - Example - console.log("hello"); -> console.log({ log: "hello" });

export let consoleLog: (msg: any, ...args: any[]) => void;

if (isBrowser()) {
  consoleLog = window.console.log;
}

export function setConsoleLogForTesting(func: (msg: any, ...args: any[]) => void) {
  consoleLog = func;
}

/**
 * Converts content corresponding to all the console statements into (JSON.stringify)-ed content in record mode for browser tests.
 * This allows filtering certain console.logs to generate the recordings for browser tests.
 */
export function customConsoleLog() {
  for (const method in window.console) {
    if (
      window.console.hasOwnProperty(method) &&
      typeof (window.console as any)[method] === "function"
    ) {
      (window.console as any)[method] = function(obj: any) {
        try {
          if (!JSON.parse(obj).writeFile) {
            // If the JSON string doesn't contain `.writeFile` property,
            // we wrap the object as a JSON object and apply JSON.stringify()
            // Example - console.warn("hello"); -> console.log({ warn: "hello" });
            const newObj: any = {};
            newObj[method] = obj;
            consoleLog(JSON.stringify(newObj));
          } else {
            // If the JSON strings contain `.writeFile` property,
            // use the console.log as it is.
            consoleLog(obj);
          }
        } catch (error) {
          // If the object is not a JSON string, the try block fails and
          // we wrap the object as a JSON object and apply JSON.stringify()
          // (same as the if block in try)
          const newObj: any = {};
          newObj[method] = obj;
          consoleLog(JSON.stringify(newObj));
        }
      };
    }
  }
}
