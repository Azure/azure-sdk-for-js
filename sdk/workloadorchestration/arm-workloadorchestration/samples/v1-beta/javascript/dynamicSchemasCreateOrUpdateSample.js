// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a DynamicSchema Resource
 *
 * @summary create or update a DynamicSchema Resource
 * x-ms-original-file: 2026-05-01-preview/DynamicSchemas_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dynamicSchemasCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.dynamicSchemas.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await dynamicSchemasCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
