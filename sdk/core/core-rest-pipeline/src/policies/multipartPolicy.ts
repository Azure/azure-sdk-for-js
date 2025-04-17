// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

import {
  multipartPolicyName as tspMultipartPolicyName,
  multipartPolicy as tspMultipartPolicy,
} from "@typespec/ts-http-runtime/internal/policies";

/**
 * Name of multipart policy
 */
export const multipartPolicyName = tspMultipartPolicyName;

/**
 * Pipeline policy for multipart requests
 */
export function multipartPolicy(): PipelinePolicy {
  return tspMultipartPolicy();
}
