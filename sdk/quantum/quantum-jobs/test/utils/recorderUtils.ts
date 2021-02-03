// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, isRecordMode } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";

if (isNode) {
  dotenv.config();
}

export function getUniqueString(defaultValue: string): string {
  return isPlaybackMode() || isRecordMode()
    ? defaultValue
    : Math.random()
        .toString()
        .slice(2);
}
