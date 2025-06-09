// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes fabric agent.
 *
 * @summary deletes fabric agent.
 * x-ms-original-file: 2024-09-01/FabricAgent_Delete.json
 */
async function deletesTheFabricAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.fabricAgent.delete("rgswagger_2024-09-01", "wPR", "M");
}

async function main(): Promise<void> {
  await deletesTheFabricAgent();
}

main().catch(console.error);
