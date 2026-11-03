// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 *
 * @summary gets an existing connection monitor test with the specified name under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/GetConnectionMonitorTest.json
 */
async function getConnectionMonitorTest() {
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

async function main() {
  await getConnectionMonitorTest();
}

main().catch(console.error);
