// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "@typespec/ts-http-runtime";

export const decompressResponsePolicyName = "decompressResponsePolicy";

export function decompressResponsePolicy(): PipelinePolicy {
  throw new Error("decompressResponsePolicy is not supported in browser environment");
}
