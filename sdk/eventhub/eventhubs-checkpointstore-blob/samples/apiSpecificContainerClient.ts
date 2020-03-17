/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to extend the Storage Blob Container Client
  to change the API version used when communicating with the service.

  This may be useful if the environment you are targetting supports an
  older version of Storage Blob than is officially supported by the
  @azure/storage-blob SDK.

  For example, if you are running Event Hubs on Azure Stack Hub,
  the Azure Stack Hub version 2002 supports up to version 2017-11-09
  of the Azure Storage service.

  For more information on the Azure Storage versions supported on Azure Stack,
  please refer to https://docs.microsoft.com/en-us/azure-stack/user/azure-stack-acs-differences?view=azs-1910.
*/

import { ContainerClient, StoragePipelineOptions, RequestPolicyFactory } from "@azure/storage-blob";

/**
 * The ApiSpecificContainerClient overwrites the API version sent via the
 * `x-ms-version` header to "2017-11-09".
 */
export class ApiSpecificContainerClient extends ContainerClient {
  private static API_VERSION = "2017-11-09";
  constructor(connectionString: string, containerName: string, options?: StoragePipelineOptions) {
    super(connectionString, containerName, options);

    const storageVersionPolicy: RequestPolicyFactory = {
      create(nextPolicy) {
        return {
          async sendRequest(httpRequest) {
            httpRequest.headers.set("x-ms-version", ApiSpecificContainerClient.API_VERSION);
            const response = await nextPolicy.sendRequest(httpRequest);
            return response;
          }
        };
      }
    };

    const pipelineFactoriesCount = this.pipeline.factories.length;
    // Set the storage version policy as the second to last so that the HTTP header
    // is updated before the request is signed.
    this.pipeline.factories.splice(pipelineFactoriesCount - 1, 0, storageVersionPolicy);
  }
}
