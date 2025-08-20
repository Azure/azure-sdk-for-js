// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets the list of recovery points of the given protected item.
 *
 * @summary gets the list of recovery points of the given protected item.
 * x-ms-original-file: 2024-09-01/RecoveryPoints_List.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function listsTheRecoveryPoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoveryPoint.list(
    "rgrecoveryservicesdatareplication",
    "4",
    "d",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheRecoveryPoints();
}

main().catch(console.error);
