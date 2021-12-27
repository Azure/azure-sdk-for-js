// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
