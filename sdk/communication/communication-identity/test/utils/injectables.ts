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

export function getMsalUsername(): string {
  return inject(EnvVarKeys.COMMUNICATION_MSAL_USERNAME);
}
export function getMsalPassword(): string {
  return inject(EnvVarKeys.COMMUNICATION_MSAL_PASSWORD);
}

export function getM365AppId(): string {
  return inject(EnvVarKeys.COMMUNICATION_M365_APP_ID);
}

export function getM365AADTenant(): string {
  return inject(EnvVarKeys.COMMUNICATION_M365_AAD_TENANT);
}

export function getExpiredTeamsToken(): string {
  return inject(EnvVarKeys.COMMUNICATION_EXPIRED_TEAMS_TOKEN);
}

export function getAADAuthority(): string {
  return inject(EnvVarKeys.COMMUNICATION_M365_AAD_AUTHORITY);
}

export function isLiveMode(): boolean {
  return ["live"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}

export function isPlaybackMode(): boolean {
  return ["playback", undefined].includes(inject(EnvVarKeys.TEST_MODE));
}
