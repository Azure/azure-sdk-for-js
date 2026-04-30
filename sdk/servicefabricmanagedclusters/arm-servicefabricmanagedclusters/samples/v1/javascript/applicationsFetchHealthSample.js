// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the status of the deployed application health. It will query the cluster to find the health of the deployed application.
 *
 * @summary get the status of the deployed application health. It will query the cluster to find the health of the deployed application.
 * x-ms-original-file: 2026-02-01/ApplicationActionFetchHealth_example.json
 */
async function fetchApplicationHealth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applications.fetchHealth("resRg", "myCluster", "myApp", {
    eventsHealthStateFilter: "Error",
    deployedApplicationsHealthStateFilter: "Error",
    servicesHealthStateFilter: "Error",
    excludeHealthStatistics: true,
    timeout: 30,
  });
}

async function main() {
  await fetchApplicationHealth();
}

main().catch(console.error);
