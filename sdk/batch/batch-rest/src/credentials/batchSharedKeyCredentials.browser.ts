// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// BatchSharedKeyCredentials is not supported in browser environment.

import { KeyCredential } from "@azure/core-auth";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

export interface BatchSharedKeyCredentials extends KeyCredential {
  /**
   * The batch account name.
   */
  accountName: string;
}

export function createBatchSharedKeyCredentialsPolicy(
  _credentials: BatchSharedKeyCredentials
): PipelinePolicy {
  return {
    name: "BatchSharedKeyCredentialsPolicy",
    async sendRequest(request, next) {
      return next(request);
    },
  };
}
