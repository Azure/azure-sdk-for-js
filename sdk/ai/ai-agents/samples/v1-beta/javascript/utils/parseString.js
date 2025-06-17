// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Utils to parse a JSON string.
 */

function parseString(input) {
  if (typeof input !== "string") {
    return input;
  }
  try {
    return JSON.parse(input);
  } catch (e) {
    throw new Error(
      `Failed to parse string: ${input}. Error: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
}

module.exports = { parseString };
