// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateEndpointConnection } from "@azure/arm-agrifood";
import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Approves or Rejects a Private endpoint connection request.
 *
 * @summary Approves or Rejects a Private endpoint connection request.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/PrivateEndpointConnections_CreateOrUpdate.json
 */
async function privateEndpointConnectionsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = "examples-rg";
  const farmBeatsResourceName = "examples-farmbeatsResourceName";
  const privateEndpointConnectionName = "privateEndpointConnectionName";
  const body: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: {
      description: "Approved by johndoe@contoso.com",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    resourceGroupName,
    farmBeatsResourceName,
    privateEndpointConnectionName,
    body,
  );
  console.log(result);
}

privateEndpointConnectionsCreateOrUpdate().catch(console.error);
