// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to send a request to resume the current application upgrade. This will resume the application upgrade from where it was paused.
 *
 * @summary send a request to resume the current application upgrade. This will resume the application upgrade from where it was paused.
 * x-ms-original-file: 2025-06-01-preview/ApplicationActionResumeUpgrade_example.json
 */
async function resumeUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applications.resumeUpgrade("resRg", "myCluster", "myApp", {
    upgradeDomainName: "UD1",
  });
}

async function main(): Promise<void> {
  await resumeUpgrade();
}

main().catch(console.error);
