// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

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
  const query = queryParts.reduce((query: { [key:string]: any }, part) => {	
    const [name, value] = part.split(/=/);
    query[name] = decodeURIComponent(value.replace(/\+/g, ' '));
    return query;
  }, {});
  return {
    url: cleanUrl,
    query
  }
}
