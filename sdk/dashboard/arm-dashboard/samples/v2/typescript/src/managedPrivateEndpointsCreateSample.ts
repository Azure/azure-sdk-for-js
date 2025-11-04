// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a managed private endpoint for a grafana resource.
 *
 * @summary create or update a managed private endpoint for a grafana resource.
 * x-ms-original-file: 2025-08-01/ManagedPrivateEndpoints_Create.json
 */
async function managedPrivateEndpointCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.create(
    "myResourceGroup",
    "myWorkspace",
    "myMPEName",
    {
      location: "West US",
      properties: {
        groupIds: ["grafana"],
        privateLinkResourceId:
          "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-000000000000/resourceGroups/xx-rg/providers/Microsoft.Kusto/Clusters/sampleKustoResource",
        privateLinkResourceRegion: "West US",
        privateLinkServiceUrl: "my-self-hosted-influxdb.westus.mydomain.com",
        requestMessage: "Example Request Message",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedPrivateEndpointCreate();
}

main().catch(console.error);
