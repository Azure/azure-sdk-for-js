// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function wrapError<T>(f: () => T, message: string): T {
  try {
    const result = f();
    return result;
  } catch (cause) {
    throw new Error(message, { cause });
  }
}
