// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 *
 * @summary creates or updates a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 * x-ms-original-file: 2026-08-31-preview/GoalTemplates_CreateOrUpdate_MaximumSet_Gen.json
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
 * This sample demonstrates how to creates or updates a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 *
 * @summary creates or updates a goal template. Deprecated: the GoalTemplate resource type is deprecated and is removed in 2026-09-30-preview. Set resiliency intent directly on the GoalAssignment (requireZonalResiliency, requireRegionalResiliency) and read resource posture from GoalResource (zonalResiliency, regionalResiliency) instead.
 * x-ms-original-file: 2026-08-31-preview/GoalTemplates_CreateOrUpdate_MinimumSet_Gen.json
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
