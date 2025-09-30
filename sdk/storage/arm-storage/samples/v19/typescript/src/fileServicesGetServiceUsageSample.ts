// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 *
 * @summary Gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/FileServicesGetUsage.json
 */
async function getFileServiceUsage(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4410";
  const accountName = "sto8607";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileServices.getServiceUsage(
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFileServiceUsage();
}

main().catch(console.error);
