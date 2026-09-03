// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a storage insight.
 *
 * @summary create or update a storage insight.
 * x-ms-original-file: 2025-07-01/StorageInsightsCreateOrUpdate.json
 */
async function storageInsightsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.storageInsightConfigs.createOrUpdate(
    "OIAutoRest5123",
    "aztest5048",
    "AzTestSI1110",
    {
      containers: ["wad-iis-logfiles"],
      storageAccount: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000005/resourcegroups/OIAutoRest6987/providers/microsoft.storage/storageaccounts/AzTestFakeSA9945",
        key: "1234",
      },
      tables: ["WADWindowsEventLogsTable", "LinuxSyslogVer2v0"],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageInsightsCreate();
}

main().catch(console.error);
