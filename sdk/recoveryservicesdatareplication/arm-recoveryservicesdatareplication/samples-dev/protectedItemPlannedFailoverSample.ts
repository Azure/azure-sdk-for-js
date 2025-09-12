// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to performs the planned failover on the protected item.
 *
 * @summary performs the planned failover on the protected item.
 * x-ms-original-file: 2024-09-01/ProtectedItem_PlannedFailover.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function performsPlannedFailover(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.protectedItem.plannedFailover(
    "rgrecoveryservicesdatareplication",
    "4",
    "d",
    {
      properties: {
        customProperties: {
          instanceType: "PlannedFailoverModelCustomProperties",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await performsPlannedFailover();
}

main().catch(console.error);
