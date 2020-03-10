/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to extend the Storage Blob Container Client
  to downlevel the API version used when communicating with the service.

  This may be useful if the environment you are targetting supports an
  older version of Storage Blob than is officially supported by the
  @azure/storage-blob SDK.
*/

const { ContainerClient } = require("@azure/storage-blob");

/**
 * The DownlevelContainerClient overwrites the API version sent via the
 * `x-ms-version` header to "2017-11-09".
 */
class DownlevelContainerClient extends ContainerClient {
  constructor(connectionString, containerName, options) {
    super(connectionString, containerName, options);

    const storageVersionPolicy = {
      create(nextPolicy) {
        return {
          async sendRequest(httpRequest) {
            httpRequest.headers.set("x-ms-version", DownlevelContainerClient.API_VERSION);
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
DownlevelContainerClient.API_VERSION = "2017-11-09";
exports.DownlevelContainerClient = DownlevelContainerClient;
