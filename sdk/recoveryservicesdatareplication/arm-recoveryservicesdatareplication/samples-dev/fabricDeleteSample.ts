// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to removes the fabric.
 *
 * @summary removes the fabric.
 * x-ms-original-file: 2024-09-01/Fabric_Delete.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function deletesTheFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.fabric.delete("rgrecoveryservicesdatareplication", "wPR");
}

async function main(): Promise<void> {
  await deletesTheFabric();
}

main().catch(console.error);
