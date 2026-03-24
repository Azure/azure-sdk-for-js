// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy, TlsSettings } from "@typespec/ts-http-runtime";

export const tlsPolicyName = "tlsPolicy";

export function tlsPolicy(_tlsSettings?: TlsSettings): PipelinePolicy {
  throw new Error("tlsPolicy is not supported in browser environment");
}
