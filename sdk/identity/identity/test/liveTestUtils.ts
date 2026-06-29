// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function isLiveMode(): boolean {
  return process.env.TEST_MODE?.toLowerCase() === "live";
}
