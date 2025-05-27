// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of the latest application upgrade. It will query the cluster to find the status of the latest application upgrade.
 *
 * @summary get the status of the latest application upgrade. It will query the cluster to find the status of the latest application upgrade.
 * x-ms-original-file: 2025-03-01-preview/ApplicationActionGetUpgrade_example.json
 */
async function getAnApplicationUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.applications.readUpgrade("resRg", "myCluster", "myApp");
}

async function main(): Promise<void> {
  await getAnApplicationUpgrade();
}

main().catch(console.error);
