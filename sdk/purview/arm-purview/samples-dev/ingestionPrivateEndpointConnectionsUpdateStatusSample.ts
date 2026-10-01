// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update ingestion private endpoint connection status
 *
 * @summary update ingestion private endpoint connection status
 * x-ms-original-file: 2024-04-01-preview/IngestionPrivateEndpointConnections_UpdateStatus.json
 */
async function ingestionPrivateEndpointConnectionsUpdateStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.ingestionPrivateEndpointConnections.updateStatus(
    "SampleResourceGroup",
    "account1",
    {
      privateEndpointId:
        "/subscriptions/12345678-1234-1234-12345678abc/resourceGroups/SampleResourceGroup/providers/Microsoft.Purview/accounts/account1/privateEndpointConnections/privateEndpointConnection1",
      status: "Approved",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ingestionPrivateEndpointConnectionsUpdateStatus();
}

main().catch(console.error);
