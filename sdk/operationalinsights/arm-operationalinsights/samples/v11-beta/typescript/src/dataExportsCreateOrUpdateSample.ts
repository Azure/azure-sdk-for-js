// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a data export.
 *
 * @summary create or update a data export.
 * x-ms-original-file: 2025-07-01/DataExportCreateOrUpdate.json
 */
async function dataExportCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.dataExports.createOrUpdate("RgTest1", "DeWnTest1234", "export1", {
    destination: {
      resourceId:
        "/subscriptions/192b9f85-a39a-4276-b96d-d5cd351703f9/resourceGroups/OIAutoRest1234/providers/Microsoft.EventHub/namespaces/test",
    },
    tableNames: ["Heartbeat"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dataExportCreate();
}

main().catch(console.error);
