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
export interface StorageSharedKeyCredentialPolicyOptions {
  accountName: string;
  accountKey: Buffer;
}

/**
 * storageSharedKeyCredentialPolicy handles signing requests using storage account keys.
 */
export function storageSharedKeyCredentialPolicy(
  _options: StorageSharedKeyCredentialPolicyOptions,
): PipelinePolicy {
  return {
    name: storageSharedKeyCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      return next(request);
    },
  };
}
