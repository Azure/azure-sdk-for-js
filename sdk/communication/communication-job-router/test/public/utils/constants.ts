// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// HACK: Intentionally block to:
//  * avoid 'duplicate sequence number' error from service (calling commands too fast?)
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const timeoutMs: number = 15000;
