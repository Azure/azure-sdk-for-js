// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URLBuilder } from "@azure/core-http";

export { testHasChanged } from "./recordings";

export { generateTestRecordingFilePath } from "./recordingPath";

export { windowLens } from "./windowLens";

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
 * Removes new lines from a string.
 * @param str String with new lines
 */
export function stripNewLines(str: string): string {
  return str.replace(/(\r\n|\n|\r)/gm, "");
}

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
  // Replaces only if the content-type is binary(Currently, "avro/binary" is considered)
  if (!isBrowser() && isContentTypeInNockFixture(fixture, binaryContentTypes)) {
    // Matching with 200-206 status codes (Successful codes)
    const matches = fixture.match(/\.reply\((.*), "(.*)", .*/);
    if (matches) {
      const statusCode = Number(matches[1]);
      // Success status codes >=200 & < 300
      if (statusCode >= 200 && statusCode < 300 && isHex(matches[2])) {
        fixture = fixture.replace(`"${matches[2]}"`, `Buffer.from("${matches[2]}", "hex")`);
      }
    }
  }
  return fixture;
}

/**
 * Meant for node recordings only!
 *
 * @private
 * @param {string} fixture
 */
export function handleSingleQuotesInUrlPath(fixture: string): string {
  let updatedFixture = fixture;
  if (!isBrowser()) {
    const matches = fixture.match(/\.(get|put|post|delete)\(\'(.*)\'(\,|\))/);
    if (matches && matches[2]) {
      const match = matches[2];
      if (match.search("'") !== -1) {
        updatedFixture = fixture.replace("'" + match + "'", "`" + match + "`");
      }
    }
  }
  return updatedFixture;
}

/**
 * List of binary content types.
 * Currently, "avro/binary" is the only one present.
 */
export const binaryContentTypes = ["avro/binary"];
