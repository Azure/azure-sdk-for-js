// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import fs from "fs-extra";
import { URLBuilder } from "@azure/core-http";

export interface TestInfo {
  uniqueName: { [x: string]: string };
  newDate: { [x: string]: string };
}

export type ReplacementMap = Map<string, string>;
/**
 * Interface to setup environment necessary for the test run.
 *
 * @export
 * @interface RecorderEnvironmentSetup
 */
export interface RecorderEnvironmentSetup {
  /**
   * Used in record and playback modes
   *
   *  1. The key-value pairs will be used as the environment variables in playback mode.
   *  2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
   *
   * @type {{ [ENV_VAR: string]: string }}
   * @memberof RecorderEnvironmentSetup
   */
  replaceableVariables: { [ENV_VAR: string]: string };
  /**
   *  Used in record mode
   *
   *   Array of callback functions provided to customize the generated recordings in record mode
   *
   *  Example with one callback function -
   *      `sig` param of SAS Token is being filtered here from the recordings..
   *      [ (recording: string): string => recording.replace(new RegExp(env.ACCOUNT_SAS.match("(.*)&sig=(.*)")[2], "g"), "aaaaa") ]
   *
   * @type {Array<(content: string) => string>}
   * @memberof RecorderEnvironmentSetup
   */
  customizationsOnRecordings: Array<(content: string) => string>;
  /**
   * Used in record and playback modes
   *
   *  Array of query parameters provided will be filtered from the requests
   *
   * @type {Array<string>}
   * @memberof RecorderEnvironmentSetup
   */
  queryParametersToSkip: Array<string>;
}

export const env = isBrowser() ? (window as any).__env__ : process.env;

export function isRecordMode() {
  // It should be safe to assume that these two can be considered being in record mode.
  // For more specific distinctions, one can use isSoftRecordMode.
  return env.TEST_MODE === "record" || isSoftRecordMode();
}

export function isSoftRecordMode() {
  return env.TEST_MODE === "soft-record";
}

export function isLiveMode() {
  return env.TEST_MODE === "live";
}

export function isPlaybackMode() {
  return !isRecordMode() && !isLiveMode();
}

/**
 * Encodes a string as a URI component, but also taking in consideration the RFC 3986 specification.
 * JavaScript's encodeURIComponent method doesn't take in consideration the characters: !, ', (, ), *
 * @param str The string that needs to be encoded.
 */
export function encodeRFC3986(str: string): string {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (x) =>
      `%${x
        .charCodeAt(0)
        .toString(16)
        .toUpperCase()}`
  );
}

/**
 * Escapes all of the valid RegExp characters of a string.
 * @param str The string that needs to be escaped.
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * Replaces all occurrences of a pattern in a string with a given replacement.
 * @param string Target of the replacements.
 * @param pattern String used to match and find what to replace.
 * @param replacement Replacement of the matched string.
 */
function replaceAll(string: string, pattern: string, replacement: string) {
  return string.replace(new RegExp(escapeRegExp(pattern), "g"), replacement);
}

/**
 * Looks for the environment variables based on the keys of the given map,
 * then replaces the values found with each value from the same map.
 * @param replacements A map of string keys and string values.
 * @param content The content that has the text to be replaced.
 */
export function applyReplacementMap(
  env: NodeJS.ProcessEnv,
  replacements: ReplacementMap,
  content: string
): string {
  let updated = content;
  replacements.forEach((replacement: string, key: string) => {
    if (env[key]) {
      updated = replaceAll(updated, encodeRFC3986(env[key]!), encodeRFC3986(replacement));
      updated = replaceAll(updated, env[key]!, replacement);
      if (
        env[key]!.startsWith("http") &&
        replacement.startsWith("http") &&
        URLBuilder.parse(env[key]!).getHost()
      ) {
        // If an ENV variable and its replacement start with `http` with a valid hostname, replace the hostname
        // with the one provided in the replacement. This has no effect incase the URI is already replaced in the previous step.
        updated = replaceAll(
          updated,
          URLBuilder.parse(env[key]!).getHost()!,
          URLBuilder.parse(replacement).getHost()!
        );
      }
    }
  });
  return updated;
}

/**
 * Passes the given content as the parameter to the first function of the array,
 * then reduces the remaining functions of the array with the result of the previous function.
 * @param replacements An array of replacement functions.
 * @param content The input used to apply the replacements.
 */
export function applyReplacementFunctions(
  replacements: Array<(content: string) => string>,
  content: string
): string {
  let updated = content;
  for (const map of replacements) {
    updated = map(updated);
  }
  return updated;
}

/**
 * Method to avoid unintended/accidental occurrences of secrets in the recordings.
 *
 * Takes in the content(recording), replaceableVariables and replacements(callback functions).
 * Returns the recording after the updates as per the provided replaceableVariables, and the replacement functions.
 * @export
 * @param {string} content
 * @param { [ENV_VAR: string]: string } replaceableVariables
 * @param {ReplacementFunctions} replacements
 * @returns
 */
export function filterSecretsFromStrings(
  content: string,
  replaceableVariables: { [ENV_VAR: string]: string },
  customizations: Array<(content: string) => string>
) {
  const result = applyReplacementMap(env, new Map(Object.entries(replaceableVariables)), content);
  return applyReplacementFunctions(customizations, result);
}

/**
 * Method to avoid unintended/accidental occurrences of secrets in the recordings.
 *
 * Takes in the content(recording), replaceableVariables and replacements(callback functions).
 * Returns the recording after the updates as per the provided replaceableVariables, and the replacement functions.
 * @export
 * @param {any} content
 * @param { [ENV_VAR: string]: string } replaceableVariables
 * @param {ReplacementFunctions} replacements
 * @returns
 */
export function filterSecretsRecursivelyFromJSON(
  content: any,
  replaceableVariables: { [ENV_VAR: string]: string },
  customizations: Array<(content: string) => string>
) {
  let updatedContent = content;
  if (typeof updatedContent === "string") {
    // strings
    updatedContent = filterSecretsFromStrings(updatedContent, replaceableVariables, customizations);
  } else if (Array.isArray(updatedContent)) {
    // arrays
    updatedContent = updatedContent.map((item) =>
      filterSecretsRecursivelyFromJSON(item, replaceableVariables, customizations)
    );
  } else {
    // json objects
    for (const i of Object.keys(updatedContent)) {
      if (typeof updatedContent[i] === "string") {
        updatedContent[i] = filterSecretsFromStrings(
          updatedContent[i],
          replaceableVariables,
          customizations
        );
      } else if (updatedContent[i] !== null && typeof updatedContent[i] === "object") {
        updatedContent[i] = filterSecretsRecursivelyFromJSON(
          updatedContent[i],
          replaceableVariables,
          customizations
        );
      }
    }
    // last resort to capture any left over secrets
    updatedContent = JSON.parse(
      filterSecretsFromStrings(JSON.stringify(updatedContent), replaceableVariables, customizations)
    );
  }
  return updatedContent;
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
  // TS doesn't know this code needs to run downlevel sometimes.
  // @ts-expect-error
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
      if (
        fs.existsSync(path.resolve(currentPath, "package.json")) &&
        fs.existsSync(path.resolve(currentPath, "..", "..", "sdk/")) &&
        fs.existsSync(path.resolve(currentPath, "..", "..", "..", "rush.json"))
      ) {
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

export function formatPath(path: string): string {
  return path
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/<=/g, "lte")
    .replace(/>=/g, "gte")
    .replace(/</g, "lt")
    .replace(/>/g, "gt")
    .replace(/=/g, "eq")
    .replace(/\W/g, "");
}

/**
 * Generates a file path with the following structure:
 *
 *     `{node|browsers}/<describe-block-title>/recording_<test-title>.{js|json}`
 *
 * @param platform A string, either "node" or "browsers".
 * @param testSuiteTitle The title of the test suite.
 * @param testTitle The title of the specific test we're running.
 */
export function generateTestRecordingFilePath(
  platform: "node" | "browsers",
  testSuiteTitle: string,
  testTitle: string
): string {
  // File Extension
  // nock recordings for node tests - .js extension
  // recordings are saved in json format for browser tests - .json extension
  const ext = platform === "node" ? "js" : "json";
  return `${platform}/${formatPath(testSuiteTitle)}/recording_${formatPath(testTitle)}.${ext}`;
}

/**
 * Requires a file if it exists. Only works on NodeJS.
 */
export function nodeRequireRecordingIfExists(recordingPath: string, testAbsolutePath: string): any {
  if (isBrowser()) throw new Error("nodeRequireRecordingIfExists only works on NodeJS");
  const path = require("path");

  // Get the full path of the `recordings` folder by navigating through the hierarchy of the test file path.
  const recordingsFolderPath = findRecordingsFolderPath(testAbsolutePath);
  const absoluteRecordingPath = path.resolve(recordingsFolderPath, recordingPath);

  if (fs.existsSync(absoluteRecordingPath)) {
    return require(absoluteRecordingPath);
  } else {
    throw new Error(`The recording ${recordingPath} was not found in ${recordingsFolderPath}`);
  }
}

/**
 * Checks if a test hasn't changed from the last time it was recorded.
 * @param testContext
 * @param testSuiteTitle
 * @param testTitle
 * @param currentHash
 */
export function testHasChanged(
  testSuiteTitle: string,
  testTitle: string,
  testAbsolutePath: string,
  currentHash: string
): boolean {
  const platform = isBrowser() ? "browsers" : "node";
  const recordingPath: string = generateTestRecordingFilePath(platform, testSuiteTitle, testTitle);

  let previousHash: string = "";

  if (platform === "node") {
    try {
      previousHash = nodeRequireRecordingIfExists(recordingPath, testAbsolutePath).hash;
    } catch (e) {}
  } else if (windowLens.get(["__json__", "recordings/" + recordingPath])) {
    previousHash = windowLens.get(["__json__", "recordings/" + recordingPath, "hash"]);
  }

  if (!previousHash) {
    return true;
  }

  return previousHash !== currentHash;
}

/**
 * Removes new lines from a string.
 * @param str String with new lines
 */
export function stripNewLines(str: string): string {
  return str.replace(/(\r\n|\n|\r)/gm, "");
}

/**
 * A method that allows us to alter and retrieve from the Window object.
 * This will help us clean up the code later.
 */
export const windowLens: {
  get: (propertyPath: string[], root?: any) => any;
  set: (propertyPath: string[], propertyValue: any, root?: any) => void;
} = {
  get(propertyPath: string[], root = window): any {
    if (propertyPath.length === 1) {
      return root[propertyPath[0]];
    }
    if (!root[propertyPath[0]]) {
      return;
    }
    return this.get(propertyPath.slice(1), root[propertyPath[0]]);
  },
  set(propertyPath: string[], propertyValue: any, root = window): void {
    if (propertyPath.length === 1) {
      root[propertyPath[0]] = propertyValue;
      return;
    }
    if (!root[propertyPath[0]]) {
      root[propertyPath[0]] = {};
    }
    return this.set(propertyPath.slice(1), propertyValue, root[propertyPath[0]]);
  }
};

/**
 * Returns true if the given string is a hexadecimal value
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function isHex(value: string): boolean {
  if (/^[0-9a-fA-F]+$/.test(value)) {
    return true;
  }
  return false;
}

/**
 * Meant for node recordings only!
 * Returns true if the content-type in the `fixture` matches with
 * any of the strings provided in the expected content types.
 *
 * @private
 * @param {string} fixture
 * @param {string} expectedContentTypes
 * @returns {boolean}
 */
export function isContentTypeInNockFixture(
  fixture: string,
  expectedContentTypes: string[]
): boolean {
  for (const contentType of expectedContentTypes) {
    if (fixture.replace(/(\r\n|\n|\r|\s)/gm, "").includes(`'Content-Type','${contentType}'`)) {
      return true;
    }
  }
  return false;
}

/**
 * Meant for node recordings only!
 * Decodes "hex" strings in the response from the recorded fixture if any exists.
 * For example, the following part of the nock fixture/recording would be updated.
 * from `.reply(200, "4f626a01", [`
 * to   `.reply(200, Buffer.from("4f626a01", "hex"), [`
 *
 * @private
 * @param {string} fixture
 */
export function decodeHexEncodingIfExistsInNockFixture(fixture: string): string {
  // Matching with 200 status code since only they have the responses with hex encoding
  // Replaces only if the content-type is binary(Currently, "avro/binary" is considered)
  if (!isBrowser() && isContentTypeInNockFixture(fixture, binaryContentTypes)) {
    const matches = fixture.match(/\.reply\(200, "(.*)", .*/);
    if (matches && isHex(matches[1])) {
      fixture = fixture.replace(`"${matches[1]}"`, `Buffer.from("${matches[1]}", "hex")`);
    }
  }
  return fixture;
}

/**
 * List of binary content types.
 * Currently, "avro/binary" is the only one present.
 */
export const binaryContentTypes = ["avro/binary"];
