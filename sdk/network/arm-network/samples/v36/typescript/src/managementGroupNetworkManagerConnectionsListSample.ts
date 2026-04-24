// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all network manager connections created by this management group.
 *
 * @summary List all network manager connections created by this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerConnectionManagementGroupList.json
 */
async function listManagementGroupNetworkManagerConnection(): Promise<void> {
  const managementGroupId = "managementGroupA";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.managementGroupNetworkManagerConnections.list(
    managementGroupId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
