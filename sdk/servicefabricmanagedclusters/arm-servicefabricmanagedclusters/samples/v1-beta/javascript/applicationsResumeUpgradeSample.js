// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to send a request to resume the current application upgrade. This will resume the application upgrade from where it was paused.
 *
 * @summary send a request to resume the current application upgrade. This will resume the application upgrade from where it was paused.
 * x-ms-original-file: 2025-10-01-preview/ApplicationActionResumeUpgrade_example.json
 */
async function resumeUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applications.resumeUpgrade("resRg", "myCluster", "myApp", {
    upgradeDomainName: "UD1",
  });
}

async function main() {
  await resumeUpgrade();
}

main().catch(console.error);
