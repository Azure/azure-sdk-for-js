// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the incident relation.
 *
 * @summary creates or updates the incident relation.
 * x-ms-original-file: 2025-07-01-preview/incidents/relations/CreateIncidentRelation.json
 */
async function createsOrUpdatesARelationForAGivenIncident(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.incidentRelations.createOrUpdate(
    "myRg",
    "myWorkspace",
    "afbd324f-6c48-459c-8710-8d1e1cd03812",
    "4bb36b7b-26ff-4d1c-9cbe-0d8ab3da0014",
    {
      relatedResourceId:
        "/subscriptions/d0cfe6b2-9ac0-4464-9919-dccaee2e48c0/resourceGroups/myRg/providers/Microsoft.OperationalIinsights/workspaces/myWorkspace/providers/Microsoft.SecurityInsights/bookmarks/2216d0e1-91e3-4902-89fd-d2df8c535096",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesARelationForAGivenIncident();
}

main().catch(console.error);
