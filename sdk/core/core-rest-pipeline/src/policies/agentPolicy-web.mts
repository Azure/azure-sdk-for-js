// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Agent, PipelinePolicy } from "@typespec/ts-http-runtime";

export const agentPolicyName = "agentPolicy";

export function agentPolicy(_agent?: Agent): PipelinePolicy {
  throw new Error("agentPolicy is not supported in browser environment");
}
