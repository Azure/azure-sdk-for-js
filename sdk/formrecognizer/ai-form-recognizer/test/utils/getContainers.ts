// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient, type ServiceSasParameters } from "@azure/arm-storage";
import type { TokenCredential } from "@azure/core-auth";
import type { EnvVarKeys } from "./constants.js";

type EnvVarType = (typeof EnvVarKeys)[keyof typeof EnvVarKeys];

export async function getContainerUrls(inputs: {
  subscriptionId: string;
  resourceGroupName: string;
  accountName: string;
  credential: TokenCredential;
  containers: Array<{
    name: string;
    sasParams: ServiceSasParameters;
    envVarName: EnvVarType;
  }>;
}): Promise<Array<{ envVarName: EnvVarType; sasUrl: string }>> {
  const { subscriptionId, resourceGroupName, accountName, credential, containers } = inputs;
  const blobEndpoint = `https://${accountName}.blob.core.windows.net/`;
  const storageClient = new StorageManagementClient(credential, subscriptionId);
  return Promise.all(
    containers.map(async ({ name: containerName, sasParams, envVarName }) => ({
      envVarName,
      sasUrl: await generateContainerSasUrl({
        storageClient,
        containerName,
        resourceGroupName,
        accountName,
        blobEndpoint,
        sasParams,
      }),
    })),
  );
}

async function generateContainerSasUrl(inputs: {
  storageClient: StorageManagementClient;
  containerName: string;
  resourceGroupName: string;
  accountName: string;
  blobEndpoint: string;
  sasParams: ServiceSasParameters;
}): Promise<string> {
  const { storageClient, containerName, resourceGroupName, accountName, blobEndpoint, sasParams } =
    inputs;
  const result = await storageClient.storageAccounts.listServiceSAS(
    resourceGroupName,
    accountName,
    sasParams,
  );
  if (!result.serviceSasToken) {
    throw new Error(`Failed to generate SAS token for container: ${containerName}`);
  }
  return `${blobEndpoint}${containerName}?${result.serviceSasToken}`;
}
