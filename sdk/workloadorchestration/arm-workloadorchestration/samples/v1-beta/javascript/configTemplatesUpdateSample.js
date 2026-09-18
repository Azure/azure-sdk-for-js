// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Config Template Resource
 *
 * @summary update a Config Template Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_Update_MaximumSet_Gen.json
 */
async function configTemplatesUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplates.update("rgconfigurationmanager", "testname", {
    properties: { description: "acogkthm" },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await configTemplatesUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
