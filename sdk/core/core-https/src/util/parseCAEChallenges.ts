// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * parseCAEChallenges Parses multiple challenges into an array of objects.
 * Allows users to specify the challenge type through the TChallenge type parameter.
 */
export function parseCAEChallenges<TChallenge>(challenges: string): TChallenge[] {
  if (!challenges) return [{} as TChallenge];

  // Parses a `key="value"` string into an object with { key: "key", value: "value" }
  const parseKeyValue = (keyValue: string): { key: string; value: string } =>
    (keyValue.match(/(?<key>\w+(?==))="(?<value>[^"]*)"/) as any)?.groups || {};

  // Receives an array of `key="value"` strings
  // And produces an object with properties based on those keys and values.
  const groupKeyValues = (keyValues: string[]): TChallenge =>
    keyValues.reduce((parsedChallenge, keyValue) => {
      const { key, value } = parseKeyValue(keyValue);
      if (!key) {
        return parsedChallenge;
      }
      return {
        ...parsedChallenge,
        [key]: value || ""
      };
    }, {}) as TChallenge;

  // Splits a string challenge composed of key="value" elements separated by comma
  // into an array of `key="value"` strings.
  const separateKeyValues = (challenge: string): string[] =>
    `${challenge}, `.match(/(\w+="[^"]*"(?=, ))/g) || [];

  // Each set of challenges will be separated by "Bearer ".
  const bearerSeparated = challenges.split("Bearer").filter((x) => x);

  return bearerSeparated.map((challenge) => groupKeyValues(separateKeyValues(challenge)));
}
