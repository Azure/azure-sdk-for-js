// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy, ProxySettings } from "@typespec/ts-http-runtime";

export const proxyPolicyName = "proxyPolicy";

export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined {
  return undefined;
}

export function proxyPolicy(
  _proxySettings?: ProxySettings,
  _options?: {
    customNoProxyList?: string[];
  },
): PipelinePolicy {
  throw new Error("proxyPolicy is not supported in browser environment");
}
