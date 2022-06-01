// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to create a custom `Pipeline` that the
 * Storage Blob Container Client uses to change the API version used
 * when communicating with the service.
 *
 * This may be useful in environments like Azure Stack which supports an
 * older version of Storage service than is officially supported by the
 * Storage Blob SDK.
 *
 * @azsdk-util true
 */

import {
  Pipeline,
  RequestPolicyFactory,
  StorageSharedKeyCredential,
  newPipeline,
} from "@azure/storage-blob";

// In this example, we assume you are running Event Hubs on Azure Stack Hub
// version 2002 that supports up to version 2017-11-09 of the Azure Storage service.

// For more information on the Azure Storage versions supported on Azure Stack,\
// please refer to https://docs.microsoft.com/azure-stack/user/azure-stack-acs-differences.

const API_VERSION = "2017-11-09";

/**
 * The createCustomPipeline function returns a new pipeline that overwrites
 * the API version sent via the `x-ms-version` header to "2017-11-09".
 */
export function createCustomPipeline(credentials: StorageSharedKeyCredential): Pipeline {
  const storagePipeline = newPipeline(credentials);
  const storageVersionPolicy: RequestPolicyFactory = {
    create(nextPolicy) {
      return {
        async sendRequest(httpRequest) {
          httpRequest.headers.set("x-ms-version", API_VERSION);
          const response = await nextPolicy.sendRequest(httpRequest);
          return response;
        },
      };
    },
  };
  const pipelineFactoriesCount = storagePipeline.factories.length;
  // Set the storage version policy as the second to last so that the HTTP header
  // is updated before the request is signed.
  storagePipeline.factories.splice(pipelineFactoriesCount - 1, 0, storageVersionPolicy);

  return storagePipeline;
}
