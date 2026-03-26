// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete specified pending connection created by this management group.
 *
 * @summary delete specified pending connection created by this management group.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionManagementGroupDelete.json
 */
async function deleteManagementGroupNetworkManagerConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  await client.managementGroupNetworkManagerConnections.delete(
    "managementGroupA",
    "TestNMConnection",
  );
}

async function main(): Promise<void> {
  await deleteManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
