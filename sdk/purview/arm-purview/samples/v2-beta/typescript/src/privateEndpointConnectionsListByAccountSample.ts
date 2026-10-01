// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get private endpoint connections for account
 *
 * @summary get private endpoint connections for account
 * x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_ListByAccount.json
 */
async function privateEndpointConnectionsListByAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByAccount(
    "SampleResourceGroup",
    "account1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionsListByAccount();
}

main().catch(console.error);
