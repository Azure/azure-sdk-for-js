// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function getConnectionString(): string {
  return inject(EnvVarKeys.CONNECTION_STRING);
}

export function isLiveMode(): boolean {
  return ["live"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}

export function isPlaybackMode(): boolean {
  return ["playback", undefined].includes(inject(EnvVarKeys.TEST_MODE));
}
