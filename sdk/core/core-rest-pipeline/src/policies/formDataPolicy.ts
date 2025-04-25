// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

import {
  formDataPolicyName as tspFormDataPolicyName,
  formDataPolicy as tspFormDataPolicy,
} from "@typespec/ts-http-runtime/internal/policies";

/**
 * The programmatic identifier of the formDataPolicy.
 */
export const formDataPolicyName = tspFormDataPolicyName;

/**
 * A policy that encodes FormData on the request into the body.
 */
export function formDataPolicy(): PipelinePolicy {
  return tspFormDataPolicy();
}
