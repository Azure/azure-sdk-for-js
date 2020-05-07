// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import fs from "fs-extra";
export interface TestInfo {
  uniqueName: { [x: string]: string };
  newDate: { [x: string]: string };
}

export const env = isBrowser() ? (window as any).__env__ : process.env;

export function isRecordMode() {
  return env.TEST_MODE === "record";
}

export function isPlaybackMode() {
  return env.TEST_MODE === "playback";
}

export function escapeRegExp(str: string): string {
  return encodeURIComponent(str)
    .replace(
      /[!'()*]/g,
      (x) =>
        `%${x
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()}`
    ) // RFC 3986.
    .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); // All the RegExp sensitive characters.
}

/**
 * @returns {Promise<string>}
 */
export async function blobToString(blob: Blob): Promise<string> {
  const fileReader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsText(blob);
  });
}

/**
 * String.prototype.padStart()
 *
 * @param {string} currentString
 * @param {number} targetLength
 * @param {string} [padString=" "]
 * @returns {string}
 */
function padStart(currentString: string, targetLength: number, padString: string = " "): string {
  if (String.prototype.padStart) {
    return currentString.padStart(targetLength, padString);
  }

  padString = padString || " ";
  if (currentString.length > targetLength) {
    return currentString;
  } else {
    targetLength = targetLength - currentString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + currentString;
  }
}

/**
 * @returns {string}
 */
export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${padStart(
    Math.floor(Math.random() * 10000).toString(),
    5,
    "00000"
  )}`;
}

/**
 * @returns {boolean}
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Usage - `await delay(<milliseconds>)`
 * This `delay` has no effect if the `TEST_MODE` is `"playback"`.
 * If the `TEST_MODE` is not `"playback"`, `delay` is a wrapper for setTimeout that resolves a promise after t milliseconds.
 *
 * @param {number} milliseconds The number of milliseconds to be delayed.
 * @returns {Promise<T>} Resolved promise
 */
export function delay(milliseconds: number): Promise<void> | null {
  return isPlaybackMode() ? null : new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Usage - `parseUrl(<url>)`
 *
 * @param {string} url The URL you want to parse
 * @returns {any} An object with the url without parameters, and a query object with all the query properties.
 */
export function parseUrl(url: string): any {
  const [cleanUrl, ...queryParts] = url.split(/[?&]/);
  const query = queryParts.reduce((query: { [key: string]: any }, part) => {
    const [name, value] = part.split(/=/);
    query[name] = decodeURIComponent(value.replace(/\+/g, " "));
    return query;
  }, {});
  return {
    url: cleanUrl,
    query
  };
}

/**
 * ONLY WORKS IN THE NODE.JS ENVIRONMENT
 *
 * Meant to be called during the playback for the node tests.
 * 1. Takes the test filePath as argument.
 * 2. Looks for the `recordings` folder in its hierarchical path.
 * 3. Returns the full path of the `recordings` folder
 *
 * While running the tests, `filePath` can vary depending on location of the test files, examples below
 *
 * 1. If roll-up generated bundle files are being leveraged to run the tests
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\dist-test\index.node.js`
 * 2. If ts complied dist-esm files are being used to run the tests
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\dist-esm\test\utils.spec.js`
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\dist-esm\test\node\utils.spec.js`
 * 3. If `.spec.ts` test files are being used directly
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\test\utils.spec.ts`
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\test\node\utils.spec.ts`
 * In the above example, no matter where the test files are,
 *    the recordings are located at `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\recordings\`.
 * In order to playback the tests, exact location of the recordings is to be found,
 *    this is done by checking the parent(s) folders until the `recordings` folder is found.
 *
 * @export
 * @param {string} filePath
 * @returns {string} location of the `recordings` folder
 */
export function findRecordingsFolderPath(filePath: string): string {
  let path = require("path");

  // Stripping away the file name
  let currentPath = path.resolve(filePath, "..");
  // File/folder path of a closest child of `currentPath` in the folder hierarchy of `filePath`
  let lastPath = filePath;
  try {
    // While loop to find the `recordings` folder
    while (!fs.existsSync(path.resolve(currentPath, "recordings/"))) {
      if (fs.existsSync(path.resolve(currentPath, "package.json"))) {
        // package.json of the SDK is found but not the `recordings` folder
        // which is supposed to be present at the same level as package.json
        throw new Error(`'recordings' folder is not found at ${currentPath}`);
      } else if (lastPath === currentPath) {
        throw new Error(
          `'recordings' folder is not found at ${currentPath} (reached the root directory)`
        );
      } else {
        lastPath = currentPath;
        currentPath = path.resolve(currentPath, "..");
      }
    }
    return path.resolve(currentPath, "recordings/");
  } catch (error) {
    throw new Error(
      `Unable to locate the 'recordings' folder anywhere in the hierarchy of the file path ${filePath}\n ${error}`
    );
  }
}
