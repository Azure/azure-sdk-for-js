// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a private endpoint connection
 *
 * @summary create or update a private endpoint connection
 * x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_CreateOrUpdate.json
 */
async function privateEndpointConnectionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "SampleResourceGroup",
    "account1",
    "privateEndpointConnection1",
    {
      privateLinkServiceConnectionState: {
        description: "Approved by johndoe@company.com",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsCreateOrUpdate();
}

main().catch(console.error);
