// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Azure Rest Core Client library for JavaScript
 * @packageDocumentation
 */

export { createRestError } from "./restError.js";
export {
  addCredentialPipelinePolicy,
  AddCredentialPipelinePolicyOptions,
} from "./clientHelpers.js";
export { operationOptionsToRequestParameters } from "./operationOptionHelpers.js";
export * from "./getClient.js";
export * from "./common.js";
