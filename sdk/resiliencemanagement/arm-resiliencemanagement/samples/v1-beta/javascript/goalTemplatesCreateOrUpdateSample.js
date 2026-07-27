// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a GoalTemplate
 *
 * @summary create a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_CreateOrUpdate_MaximumSet_Gen.json
 */
async function goalTemplatesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalTemplates.createOrUpdate("zumt", "gt1", {
    properties: {
      requireHighAvailability: "Required",
      requireDisasterRecovery: "NotRequired",
      regionalRecoveryPointObjective: "PT15M",
      regionalRecoveryTimeObjective: "PT30M",
      goalType: "Resiliency",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a GoalTemplate
 *
 * @summary create a GoalTemplate
 * x-ms-original-file: 2026-04-01-preview/GoalTemplates_CreateOrUpdate_MinimumSet_Gen.json
 */
async function goalTemplatesCreateOrUpdateMinimumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalTemplates.createOrUpdate("sg1", "gt1", {
    properties: { goalType: "Resiliency" },
  });
  console.log(result);
}

async function main() {
  await goalTemplatesCreateOrUpdateMaximumSet();
  await goalTemplatesCreateOrUpdateMinimumSet();
}

main().catch(console.error);
