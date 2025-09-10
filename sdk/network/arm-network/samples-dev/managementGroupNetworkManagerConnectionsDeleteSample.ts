// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete specified pending connection created by this management group.
 *
 * @summary Delete specified pending connection created by this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/NetworkManagerConnectionManagementGroupDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteManagementGroupNetworkManagerConnection(): Promise<void> {
  const managementGroupId = "managementGroupA";
  const networkManagerConnectionName = "TestNMConnection";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const result = await client.managementGroupNetworkManagerConnections.delete(
    managementGroupId,
    networkManagerConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
