// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all scope connections created by this network manager.
 *
 * @summary list all scope connections created by this network manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerScopeConnectionList.json
 */
async function listNetworkManagerScopeConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scopeConnections.list("rg1", "testNetworkManager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkManagerScopeConnection();
}

main().catch(console.error);
