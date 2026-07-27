// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a relation for a given incident.
 *
 * @summary deletes a relation for a given incident.
 * x-ms-original-file: 2025-07-01-preview/incidents/relations/DeleteIncidentRelation.json
 */
async function deleteTheIncidentRelation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.incidentRelations.delete(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
  );
}

async function main(): Promise<void> {
  await deleteTheIncidentRelation();
}

main().catch(console.error);
