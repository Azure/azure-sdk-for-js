// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function getValueInConnString(connectionString: string, argument: string): string {
  const searchKey = argument.toLowerCase();
  const elements = connectionString.split(";").filter((e) => Boolean(e));
  for (const element of elements) {
    const trimmedElement = element.trim();
    const [elementKey, value] = getValuePair(trimmedElement);
    const key = elementKey.toLowerCase();
    if (key === searchKey) {
      return value;
    }
  }
  return "";
}

export function getValuePair(kvp: string): string[] {
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

export function getRealAndFakePairs(
  connectionString: string,
  fakeConnString: string
): { [key: string]: string } {
  let realFakePairs = {};
  const elements = fakeConnString.split(";").filter((e) => Boolean(e));
  for (const element of elements) {
    const trimmedElement = element.trim();
    const [elementKey, value] = getValuePair(trimmedElement);
    realFakePairs = {
      ...realFakePairs,
      [getValueInConnString(connectionString, elementKey)]: value
    };
  }

  return realFakePairs;
}
