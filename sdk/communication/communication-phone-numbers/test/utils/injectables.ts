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

export function getAzureTestDomain(): string {
  return inject(EnvVarKeys.AZURE_TEST_DOMAIN);
}

export function getAzureUserAgentOverride(): string {
  return inject(EnvVarKeys.AZURE_USERAGENT_OVERRIDE);
}

export function getLiveTestDynamicConnectionString(): string {
  return inject(EnvVarKeys.COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING);
}

export function getLiveTestDynamicEndpoint(): string {
  return inject(EnvVarKeys.COMMUNICATION_LIVETEST_DYNAMIC_ENDPOINT);
}

export function getAzurePhoneNumber(): string {
  return inject(EnvVarKeys.AZURE_PHONE_NUMBER);
}

export function isLiveMode(): boolean {
  return ["live"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}

export function isPlaybackMode(): boolean {
  return ["playback", undefined].includes(inject(EnvVarKeys.TEST_MODE));
}
