// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function parseString<T = object>(input: string): T {
  if (typeof input !== "string") {
    return input as unknown as T;
  }
  try {
    return JSON.parse(input) as T;
  } catch (e) {
    throw new Error(
      `Failed to parse string: ${input}. Error: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
}
