// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function relativeRecordingsPath(): never {
  throw new Error("Attempted to use the function meant for node in a browser.");
}
