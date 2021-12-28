// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { isNode } from "@azure/core-http";
import { isPlaybackMode } from "@azure-tools/test-recorder";

if (isNode) {
  dotenv.config();
}

export function uniqueString(): string {
  return isPlaybackMode()
    ? ""
    : Math.random()
        .toString()
        .slice(2);
}

/**
 * Properties that are used to configure our polling operations
 * in tests. During playback mode we don't want any delays. During
 * live mode we can safely increase the default polling interval (currently 2s)
 * to 5s in order to reduce calls to the service.
 */
export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : 5 * 1000
};
