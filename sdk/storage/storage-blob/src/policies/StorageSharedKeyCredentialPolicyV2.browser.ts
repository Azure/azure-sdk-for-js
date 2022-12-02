// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
/**
 * The programmatic identifier of the storageSharedKeyCredentialPolicy.
 */
export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";

/**
 * Options used to configure StorageSharedKeyCredentialPolicy.
 */
export interface storageSharedKeyCredentialPolicyOptions {
  accountName: string;
  accountKey: Buffer;
}

/**
 * storageSharedKeyCredentialPolicy handles signing requests using storage account keys.
 */
export function storageSharedKeyCredentialPolicy(
  _options: storageSharedKeyCredentialPolicyOptions
): PipelinePolicy {
  return {
    name: storageSharedKeyCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      return next(request);
    },
  };
}
