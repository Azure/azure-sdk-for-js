// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get list of Private endpoint connections.
 *
 * @summary Get list of Private endpoint connections.
 * x-ms-original-file: specification/agrifood/resource-manager/Microsoft.AgFoodPlatform/preview/2021-09-01-preview/examples/PrivateEndpointConnections_ListByResource.json
 */
async function privateEndpointConnectionsListByResource(): Promise<void> {
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = "examples-rg";
  const farmBeatsResourceName = "examples-farmbeatsResourceName";
  const credential = new DefaultAzureCredential();
  const client = new AgriFoodMgmtClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByResource(
    resourceGroupName,
    farmBeatsResourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

privateEndpointConnectionsListByResource().catch(console.error);
