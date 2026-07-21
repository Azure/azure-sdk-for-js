// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Azure Rest Core Client library for JavaScript
 * @packageDocumentation
 */

export { createRestError } from "./restError.js";
export {
  addCredentialPipelinePolicy,
  type AddCredentialPipelinePolicyOptions,
} from "./clientHelpers.js";
export { operationOptionsToRequestParameters } from "./operationOptionHelpers.js";
export type { NodeReadableStream } from "@azure/core-rest-pipeline";
export { getBinaryStreamResponse } from "#platform/getBinaryStreamResponse";
export * from "./getClient.js";
export type * from "./common.js";
