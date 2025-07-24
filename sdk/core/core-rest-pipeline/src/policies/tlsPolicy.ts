// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";
import type { TlsSettings } from "../interfaces.js";

import {
  tlsPolicy as tspTlsPolicy,
  tlsPolicyName as tspTlsPolicyName,
} from "@typespec/ts-http-runtime/internal/policies";

/**
 * Name of the TLS Policy
 */
export const tlsPolicyName = tspTlsPolicyName;

/**
 * Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication.
 */
export function tlsPolicy(tlsSettings?: TlsSettings): PipelinePolicy {
  return tspTlsPolicy(tlsSettings);
}
