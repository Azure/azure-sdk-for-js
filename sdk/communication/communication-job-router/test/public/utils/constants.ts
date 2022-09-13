// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// HACK: Intentionally block to:
//  * avoid 'duplicate sequence number' error from service (calling commands too fast?)
//  * wait before deleteJob called (ensure job is in 'deletable' state)
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const timeoutMs: number = 15000;
