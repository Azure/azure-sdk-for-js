// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type Reference<T> = { ref: T | undefined };
export function referenceInit(): { ref: undefined } {
  return { ref: undefined };
}
