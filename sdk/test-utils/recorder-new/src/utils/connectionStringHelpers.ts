// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Returns the connection string parsed as JSON object.
 */
function getConnStringAsJSON(connectionString: string): Record<string, string> {
  const keyValuePairs: Record<string, string> = {};
  const elements = connectionString.split(";").filter((e) => Boolean(e));
  for (const element of elements) {
    const trimmedElement = element.trim();
    const [elementKey, value] = getKeyValuePair(trimmedElement);
    keyValuePairs[elementKey] = value;
  }
  return keyValuePairs;
}

/**
 * Returns the key and value from `<key>=<value>` string.
 *
 * `a=b=c` => ["a", "b=c"]
 */
function getKeyValuePair(kvp: string): string[] {
  // If the string is not in kvp format <key>=<value> return an empty array
  if (!kvp || kvp.indexOf("=") === -1) {
    return [];
  }

  return kvp.split(/=(.*)/).slice(0, 2);
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
  const realAndFakePairs: Record<string, string> = {};
  const fakeValues = getConnStringAsJSON(fakeConnString);
  const realValues = getConnStringAsJSON(connectionString);
  for (const key in fakeValues) {
    realAndFakePairs[realValues[key]] = fakeValues[key]; // "real value" : "fake value"
  }
  return realAndFakePairs;
}
