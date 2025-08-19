// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about the specified private link resource.
 *
 * @summary Gets information about the specified private link resource.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/PrivateLinkResourceGet.json
 */

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPrivateLinkResource(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const privateLinkResourceName = "batchAccount";
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResourceOperations.get(
    resourceGroupName,
    accountName,
    privateLinkResourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateLinkResource();
}

main().catch(console.error);
