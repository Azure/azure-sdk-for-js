// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to recommends capacity improvements for resources under the goal assignments scope. Returns AI-powered capacity assessments and recommendations.
 *
 * @summary recommends capacity improvements for resources under the goal assignments scope. Returns AI-powered capacity assessments and recommendations.
 * x-ms-original-file: 2026-04-01-preview/GoalAssignments_RecommendCapacity_MaximumSet_Gen.json
 */
async function goalAssignmentsRecommendCapacityMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalAssignments.recommendCapacity("sg1", "ga1", {
    resourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRg/providers/Microsoft.Compute/virtualMachines/vm1",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRg/providers/Microsoft.Storage/storageAccounts/sa1",
    ],
  });
}

async function main(): Promise<void> {
  await goalAssignmentsRecommendCapacityMaximumSet();
}

main().catch(console.error);
