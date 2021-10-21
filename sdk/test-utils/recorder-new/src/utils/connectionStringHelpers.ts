// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Returns the value of a key in connection string.
 */
function getValueInConnString(connectionString: string, key: string): string {
  const searchKey = key.toLowerCase();
  const elements = connectionString.split(";").filter((e) => !!e);
  for (const element of elements) {
    const trimmedElement = element.trim();
    const [elementKey, value] = getKeyValuePair(trimmedElement);
    const key = elementKey.toLowerCase();
    if (key === searchKey) {
      return value;
    }
  }
  return "";
}

/**
 * Returns the key and value from `<key>=<value>` string.
 */
function getKeyValuePair(kvp: string): string[] {
  // If the string is not in kvp format <key>=<value> return an empty array
  if (!kvp || kvp.indexOf("=") === -1) {
    return [];
  }
  // Get the substring before the first '='
  const key = kvp.substr(0, kvp.indexOf("="));
  // Get the substring after the first '='
  const value = kvp.substr(kvp.indexOf("=") + 1);

  return [key, value];
}

/**
 * Get real and fake values mapped from the provided connection strings.
 *
 * Example:
 *  connectionString = "endpoint=secretive.azure.io;token=a1b2c3d4;secret=totally_secret"
 *  fakeConnString   = "endpoint=randomval.azure.io;token=mask_tok;secret=totally_faked"
 *
 *  // Ordering/spaces are not important
 *
 * Returns
 * ```
 * {
 *   "secretive.azure.io": "randomval.azure.io",
 *   "a1b2c3d4"          : "mask_tok",
 *   "totally_secret"    : "totally_faked"
 * }
 * ```
 */
export function getRealAndFakePairs(
  connectionString: string,
  fakeConnString: string
): Record<string, string> {
  let realAndFakePairs = {};
  const elements = fakeConnString.split(";").filter((e) => Boolean(e));
  for (const element of elements) {
    const trimmedElement = element.trim();
    const [elementKey, value] = getKeyValuePair(trimmedElement);
    realAndFakePairs = {
      ...realAndFakePairs,
      [getValueInConnString(connectionString, elementKey)]: value // "real value" : "fake value"
    };
  }

  return realAndFakePairs;
}
