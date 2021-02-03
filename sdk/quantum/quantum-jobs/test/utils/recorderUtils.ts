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

export function replaceStorageSig(value: string): string {
  return value.replace(/sig=[^&]*&/g, `sig=0000000000000000000000000000000000000000000000&`);
}
