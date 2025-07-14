// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "../pipeline.js";

import {
  decompressResponsePolicyName as tspDecompressResponsePolicyName,
  decompressResponsePolicy as tspDecompressResponsePolicy,
} from "@typespec/ts-http-runtime/internal/policies";

/**
 * The programmatic identifier of the decompressResponsePolicy.
 */
export const decompressResponsePolicyName = tspDecompressResponsePolicyName;

/**
 * A policy to enable response decompression according to Accept-Encoding header
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
 */
export function decompressResponsePolicy(): PipelinePolicy {
  return tspDecompressResponsePolicy();
}
