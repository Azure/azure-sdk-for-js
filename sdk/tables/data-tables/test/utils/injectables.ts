// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function isSharedKeyAccessAllowed(): boolean {
  return inject(EnvVarKeys.ALLOW_SHARED_KEY_ACCESS);
}

export function getKey(): string {
  return inject(EnvVarKeys.KEY);
}

export function getAccountName(): string {
  return inject(EnvVarKeys.ACCOUNT_NAME);
}

export function getAccountConnectionString(): string {
  return inject(EnvVarKeys.CONNECTION_STRING);
}

export function getSasToken(): string {
  return inject(EnvVarKeys.SAS_TOKEN);
}

export function getSasConnectionString(): string {
  return inject(EnvVarKeys.SAS_CONNECTION_STRING);
}

export function isLiveMode(): boolean {
  return ["live"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}

export function isPlaybackMode(): boolean {
  return ["playback", undefined].includes(inject(EnvVarKeys.TEST_MODE));
}
