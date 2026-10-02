// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update Context Resource
 *
 * @summary create or update Context Resource
 * x-ms-original-file: 2026-05-01-preview/Contexts_CreateOrUpdate_MaximumSet_Gen.json
 */
async function contextsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.contexts.createOrUpdate("rgconfigurationmanager", "testname", {
    properties: {
      capabilities: [{ name: "alufbbxccup", state: "active", description: "sin" }],
      hierarchies: [{ name: "fz", description: "eg" }],
    },
    tags: {},
    location: "ctfi",
  });
  console.log(result);
}

async function main() {
  await contextsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
