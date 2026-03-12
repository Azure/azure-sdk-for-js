// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the properties of an existing Batch account.
 *
 * @summary Updates the properties of an existing Batch account.
 * x-ms-original-file: specification/batch/resource-manager/Microsoft.Batch/stable/2024-07-01/examples/BatchAccountUpdate.json
 */

import type { BatchAccountUpdateParameters } from "@azure/arm-batch";
import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function batchAccountUpdate(): Promise<void> {
  const subscriptionId = process.env["BATCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["BATCH_RESOURCE_GROUP"] || "default-azurebatch-japaneast";
  const accountName = "sampleacct";
  const parameters: BatchAccountUpdateParameters = {
    autoStorage: {
      storageAccountId:
        "/subscriptions/subid/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Storage/storageAccounts/samplestorage",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccountOperations.update(
    resourceGroupName,
    accountName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await batchAccountUpdate();
}

main().catch(console.error);
