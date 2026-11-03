// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to clean up the test failover of a replication protected item.
 *
 * @summary operation to clean up the test failover of a replication protected item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_TestFailoverCleanup.json
 */
async function executeTestFailoverCleanup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.testFailoverCleanup(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    { properties: { comments: "Test Failover Cleanup" } },
  );
  console.log(result);
}

async function main() {
  await executeTestFailoverCleanup();
}

main().catch(console.error);
