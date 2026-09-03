// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function parseJsonOrText(text: string): unknown {
  try {
    const value: unknown = JSON.parse(text);
    return value;
  } catch {
    return text;
  }
}
