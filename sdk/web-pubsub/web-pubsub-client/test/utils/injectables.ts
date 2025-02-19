// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";

export function getWebPubSubClientUrl(): string {
  return inject("serviceWssUrl");
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

export function getServiceHttpsUrl(): string {
  return inject("serviceHttpsUrl");
}

export function getGroupName(): string {
  return inject("groupName");
}
