// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the details of a particular failover test performed on the gateway based on the test Guid
 *
 * @summary this operation retrieves the details of a particular failover test performed on the gateway based on the test Guid
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetFailoverSingleTestDetails.json
 */
async function virtualNetworkGatewayGetFailoverSingleTestDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getFailoverSingleTestDetails(
    "rg1",
    "ergw",
    "Vancouver",
    "fe458ae8-d2ae-4520-a104-44bc233bde7e",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworkGatewayGetFailoverSingleTestDetails();
}

main().catch(console.error);
