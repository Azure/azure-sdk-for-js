// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a GoalTemplate
 *
 * @summary update a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_Update_MaximumSet_Gen.json
 */
async function goalTemplatesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.goalTemplates.update("ipvrpvfcsfwltkmalhklsyg", "gt1", {
    properties: {
      requireHighAvailability: "Required",
      requireDisasterRecovery: "NotRequired",
      regionalRecoveryPointObjective: "PT15M",
      regionalRecoveryTimeObjective: "PT30M",
      goalType: "Resiliency",
    },
  });
}

async function main(): Promise<void> {
  await goalTemplatesUpdateMaximumSet();
}

main().catch(console.error);
