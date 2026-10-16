// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DynamicSchema Resource
 *
 * @summary delete a DynamicSchema Resource
 * x-ms-original-file: 2026-05-01-preview/DynamicSchemas_Delete_MaximumSet_Gen.json
 */
async function dynamicSchemasDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.dynamicSchemas.delete("rgconfigurationmanager", "testname", "testname");
}

async function main() {
  await dynamicSchemasDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
