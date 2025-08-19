// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a IntegrationFabric
 *
 * @summary create a IntegrationFabric
 * x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Create.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function integrationFabricsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.integrationFabrics.create(
    "myResourceGroup",
    "myWorkspace",
    "sampleIntegration",
    {
      location: "West US",
      properties: {
        dataSourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Monitor/accounts/myAmw",
        scenarios: ["scenario1", "scenario2"],
        targetResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerService/managedClusters/myAks",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationFabricsCreate();
}

main().catch(console.error);
