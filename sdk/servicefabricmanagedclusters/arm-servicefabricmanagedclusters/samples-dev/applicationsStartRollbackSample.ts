// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to send a request to start a rollback of the current application upgrade. This will start rolling back the application to the previous version.
 *
 * @summary send a request to start a rollback of the current application upgrade. This will start rolling back the application to the previous version.
 * x-ms-original-file: 2025-03-01-preview/ApplicationActionStartRollback_example.json
 */
async function startAnApplicationUpgradeRollback(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.applications.startRollback("resRg", "myCluster", "myApp");
}

async function main(): Promise<void> {
  await startAnApplicationUpgradeRollback();
}

main().catch(console.error);
