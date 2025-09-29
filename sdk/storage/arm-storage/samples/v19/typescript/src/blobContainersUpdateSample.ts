// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobContainer} from "@azure/arm-storage";
import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist.
 *
 * @summary Updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersPatch.json
 */
async function updateContainers(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const containerName = "container6185";
  const blobContainer: BlobContainer = {
    metadata: { metadata: "true" },
    publicAccess: "Container",
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.update(
    resourceGroupName,
    accountName,
    containerName,
    blobContainer,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateContainers();
}

main().catch(console.error);
