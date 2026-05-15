// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specified connection created by this management group.
 *
 * @summary get a specified connection created by this management group.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionManagementGroupGet.json
 */
async function getManagementGroupNetworkManagerConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const result = await client.managementGroupNetworkManagerConnections.get(
    "managementGroupA",
    "TestNMConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
