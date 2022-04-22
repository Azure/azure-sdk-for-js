// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface KeyValuePair<T> {
  key: string;
  value: T;
}

export function arraysEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a === b) return true;
  // eslint-disable-next-line eqeqeq
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
