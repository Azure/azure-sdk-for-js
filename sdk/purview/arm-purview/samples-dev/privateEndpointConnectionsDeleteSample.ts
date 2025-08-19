// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a private endpoint connection
 *
 * @summary Delete a private endpoint connection
 * x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_Delete.json
 */

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

async function privateEndpointConnectionsDelete(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "SampleResourceGroup";
  const accountName = "account1";
  const privateEndpointConnectionName = "privateEndpointConnection1";
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

privateEndpointConnectionsDelete().catch(console.error);
