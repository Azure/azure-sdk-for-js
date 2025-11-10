// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of the deployed application health. It will query the cluster to find the health of the deployed application.
 *
 * @summary get the status of the deployed application health. It will query the cluster to find the health of the deployed application.
 * x-ms-original-file: 2025-10-01-preview/ApplicationActionFetchHealth_example.json
 */
async function fetchApplicationHealth(): Promise<void> {
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

async function main(): Promise<void> {
  await fetchApplicationHealth();
}

main().catch(console.error);
