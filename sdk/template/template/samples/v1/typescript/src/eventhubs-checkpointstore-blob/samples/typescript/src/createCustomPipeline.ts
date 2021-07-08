/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to create a custom `Pipeline` that the
  Storage Blob Container Client uses to change the API version used
  when communicating with the service.

  This may be useful if the environment you are targetting supports an
  older version of Storage Blob than is officially supported by the
  @azure/storage-blob SDK.

  For example, if you are running Event Hubs on Azure Stack Hub,
  the Azure Stack Hub version 2002 supports up to version 2017-11-09
  of the Azure Storage service.

  For more information on the Azure Storage versions supported on Azure Stack,
  please refer to https://docs.microsoft.com/azure-stack/user/azure-stack-acs-differences.
*/

import {
  Pipeline,
  RequestPolicyFactory,
  StorageSharedKeyCredential,
  newPipeline
} from "@azure/storage-blob";

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
        }
      };
    }
  };
  const pipelineFactoriesCount = storagePipeline.factories.length;
  // Set the storage version policy as the second to last so that the HTTP header
  // is updated before the request is signed.
  storagePipeline.factories.splice(pipelineFactoriesCount - 1, 0, storageVersionPolicy);

  return storagePipeline;
}
