// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode } from "@azure-tools/test-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";

if (isNode) {
  dotenv.config();
}

export function uniqueString(): string {
  return isPlaybackMode() ? "" : Math.random().toString().slice(2);
}

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};
