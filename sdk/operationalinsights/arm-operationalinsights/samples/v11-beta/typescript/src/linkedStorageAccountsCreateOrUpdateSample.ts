// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a link relation between current workspace and a group of storage accounts of a specific data source type.
 *
 * @summary create or Update a link relation between current workspace and a group of storage accounts of a specific data source type.
 * x-ms-original-file: 2025-07-01/LinkedStorageAccountsCreate.json
 */
async function linkedStorageAccountsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.linkedStorageAccounts.createOrUpdate(
    "mms-eus",
    "testLinkStorageAccountsWS",
    "CustomLogs",
    {
      storageAccountIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mms-eus/providers/Microsoft.Storage/storageAccounts/testStorageA",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mms-eus/providers/Microsoft.Storage/storageAccounts/testStorageB",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await linkedStorageAccountsCreate();
}

main().catch(console.error);
