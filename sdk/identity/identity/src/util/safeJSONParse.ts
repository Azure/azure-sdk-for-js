// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
  * Safe JSON parse.
  * @internal
  */
export function parse<T>(input: string | null | undefined): T {
  if (!input) {
    return {} as T;
  }
  try {
    return JSON.parse(input);
  } catch (e) {
    return {} as T;
  }
}
