// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to send a request to start a rollback of the current application upgrade. This will start rolling back the application to the previous version.
 *
 * @summary send a request to start a rollback of the current application upgrade. This will start rolling back the application to the previous version.
 * x-ms-original-file: 2026-02-01/ApplicationActionStartRollback_example.json
 */
async function startAnApplicationUpgradeRollback() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applications.startRollback("resRg", "myCluster", "myApp");
}

async function main() {
  await startAnApplicationUpgradeRollback();
}

main().catch(console.error);
