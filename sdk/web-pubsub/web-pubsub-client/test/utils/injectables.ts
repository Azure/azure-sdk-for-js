// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";

export function getWebPubSubClientUrl(): string {
  return inject("webPubSubClientUrl");
}

export function isMockMode(): boolean {
  return inject("testMode") === "mock";
}

export function getProxyWssUrl(): string {
  return inject("proxyWssUrl");
}

export function getProxyHttpsUrl(): string {
  return inject("proxyHttpsUrl");
}

export function getSimulatorAdminUrl(): string {
  return inject("simulatorAdminUrl");
}

export function getGroupName(): string {
  return inject("groupName");
}
