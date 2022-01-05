// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import { isPlaybackMode } from "@azure-tools/test-recorder";

if (isNode) {
  dotenv.config();
}

export function uniqueString(): string {
  return isPlaybackMode() ? "" : Math.random().toString().slice(2);
}

/**
 * Properties that are used to configure our polling operations
 * in tests. During playback mode we don't want any delays. During
 * live mode we can safely increase the default polling interval (currently 2s)
 * to 10s in order to reduce calls to the service. The service sends a retry-after
 * of 10s here anyway.
 */
export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : 10 * 1000,
};
