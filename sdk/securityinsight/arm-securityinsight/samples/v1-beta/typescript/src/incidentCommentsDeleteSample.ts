// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a comment for a given incident.
 *
 * @summary deletes a comment for a given incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/IncidentComments/IncidentComments_Delete.json
 */
async function incidentCommentsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.incidentComments.delete(
    "myRg",
    "myWorkspace",
    "73e01a99-5cd7-4139-a149-9f2736ff2ab5",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
  );
}

async function main(): Promise<void> {
  await incidentCommentsDelete();
}

main().catch(console.error);
