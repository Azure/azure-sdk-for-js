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

export function getKey(): string {
  return inject(EnvVarKeys.API_KEY);
}

export function isLocalAuthDisabled(): boolean {
  return inject(EnvVarKeys.DISABLE_LOCAL_AUTH);
}

export function getReverseProxyEndpoint(): string {
  return inject(EnvVarKeys.REVERSE_PROXY_ENDPOINT);
}

export function getSocketIOEndpoint(): string {
  return inject(EnvVarKeys.SOCKETIO_ENDPOINT);
}

export function isLiveMode(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "live";
}
