// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential } from "@azure/identity";
import { BlobServiceClient, ContainerClient, StoragePipelineOptions } from "@azure/storage-blob";
import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { EnvVarKeys } from "./constants.js";
import { randomUUID } from "@azure/core-util";

function getStorageEndpoint(): string {
  return assertEnvironmentVariable(EnvVarKeys.STORAGE_ENDPOINT);
}

export function createContainer(
  inputOptions: {
    credential?: TokenCredential;
    storageEndpoint?: string;
    options?: StoragePipelineOptions;
  } = {},
): { container: ContainerClient; containerName: string; containerUrl: string } {
  const {
    credential = createTestCredential(),
    storageEndpoint = getStorageEndpoint(),
    options,
  } = inputOptions;
  const storageClient = new BlobServiceClient(storageEndpoint, credential, options);
  const containerName = `test-container-${randomUUID()}`;
  const container = storageClient.getContainerClient(containerName);
  return {
    container,
    containerName,
    containerUrl: container.url,
  };
}
