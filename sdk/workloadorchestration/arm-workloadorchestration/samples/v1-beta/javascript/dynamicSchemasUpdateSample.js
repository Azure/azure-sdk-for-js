// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a DynamicSchema Resource
 *
 * @summary update a DynamicSchema Resource
 * x-ms-original-file: 2026-05-01-preview/DynamicSchemas_Update_MaximumSet_Gen.json
 */
async function dynamicSchemasUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.dynamicSchemas.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await dynamicSchemasUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
