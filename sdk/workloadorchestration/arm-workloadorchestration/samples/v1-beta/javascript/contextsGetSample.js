// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Context Resource
 *
 * @summary get Context Resource
 * x-ms-original-file: 2026-05-01-preview/Contexts_Get_MaximumSet_Gen.json
 */
async function contextsGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.contexts.get("rgconfigurationmanager", "testname");
  console.log(result);
}

async function main() {
  await contextsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
