// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DynamicSchema Resource
 *
 * @summary get a DynamicSchema Resource
 * x-ms-original-file: 2026-05-01-preview/DynamicSchemas_Get_MaximumSet_Gen.json
 */
async function dynamicSchemasGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.dynamicSchemas.get("rgconfigurationmanager", "testname", "testname");
  console.log(result);
}

async function main() {
  await dynamicSchemasGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
