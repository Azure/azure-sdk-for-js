// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 *
 * @summary gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/GetConnectionMonitorTest.json
 */
async function getConnectionMonitorTest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.connectionMonitorTests.get(
    "rgName",
    "peeringServiceName",
    "connectionMonitorTestName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getConnectionMonitorTest();
}

main().catch(console.error);
