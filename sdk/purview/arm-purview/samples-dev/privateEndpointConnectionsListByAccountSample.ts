// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get private endpoint connections for account
 *
 * @summary Get private endpoint connections for account
 * x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_ListByAccount.json
 */

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

async function privateEndpointConnectionsListByAccount(): Promise<void> {
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const resourceGroupName = "SampleResourceGroup";
  const accountName = "account1";
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByAccount(
    resourceGroupName,
    accountName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

privateEndpointConnectionsListByAccount().catch(console.error);
