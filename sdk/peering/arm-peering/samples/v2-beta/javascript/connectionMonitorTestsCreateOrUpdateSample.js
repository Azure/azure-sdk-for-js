// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a connection monitor test with the specified name under the given subscription, resource group and peering service.
 *
 * @summary creates or updates a connection monitor test with the specified name under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateConnectionMonitorTest.json
 */
async function createOrUpdateConnectionMonitorTest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.connectionMonitorTests.createOrUpdate(
    "rgName",
    "peeringServiceName",
    "connectionMonitorTestName",
    {
      destination: "Example Destination",
      destinationPort: 443,
      sourceAgent: "Example Source Agent",
      testFrequencyInSec: 30,
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateConnectionMonitorTest();
}

main().catch(console.error);
