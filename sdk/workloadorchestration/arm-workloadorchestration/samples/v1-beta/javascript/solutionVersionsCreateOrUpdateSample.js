// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Solution Version Resource
 *
 * @summary create or update a Solution Version Resource
 * x-ms-original-file: 2026-05-01-preview/SolutionVersions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function solutionVersionsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutionVersions.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    {
      properties: { specification: {} },
      extendedLocation: { name: "ggfwkwklvvkrmlysvvhcj", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main() {
  await solutionVersionsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
