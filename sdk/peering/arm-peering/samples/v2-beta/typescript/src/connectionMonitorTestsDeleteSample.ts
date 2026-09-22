// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 *
 * @summary deletes an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/DeleteConnectionMonitorTest.json
 */
async function deleteConnectionMonitorTest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  await client.connectionMonitorTests.delete(
    "rgName",
    "peeringServiceName",
    "connectionMonitorTestName",
  );
}

async function main(): Promise<void> {
  await deleteConnectionMonitorTest();
}

main().catch(console.error);
