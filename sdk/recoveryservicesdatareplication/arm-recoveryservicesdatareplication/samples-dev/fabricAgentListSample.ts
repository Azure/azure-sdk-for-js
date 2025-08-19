// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of fabric agents in the given fabric.
 *
 * @summary gets the list of fabric agents in the given fabric.
 * x-ms-original-file: 2024-09-01/FabricAgent_List.json
 */
async function listsTheFabricAgents(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fabricAgent.list("rgswagger_2024-09-01", "wPR")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheFabricAgents();
}

main().catch(console.error);
