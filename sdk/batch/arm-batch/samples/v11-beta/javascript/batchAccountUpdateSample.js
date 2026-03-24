// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the properties of an existing Batch account.
 *
 * @summary updates the properties of an existing Batch account.
 * x-ms-original-file: 2025-06-01/BatchAccountUpdate.json
 */
async function batchAccountUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.update("default-azurebatch-japaneast", "sampleacct", {
    autoStorage: {
      storageAccountId:
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Storage/storageAccounts/samplestorage",
    },
  });
  console.log(result);
}

async function main() {
  await batchAccountUpdate();
}

main().catch(console.error);
