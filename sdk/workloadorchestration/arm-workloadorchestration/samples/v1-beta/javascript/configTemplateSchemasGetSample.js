// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ConfigTemplateSchema Resource
 *
 * @summary get a ConfigTemplateSchema Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplateSchemas_Get_MaximumSet_Gen.json
 */
async function configTemplateSchemasGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplateSchemas.get(
    "rgconfigurationmanager",
    "testname",
    "1.0.0",
    "testname",
  );
  console.log(result);
}

async function main() {
  await configTemplateSchemasGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
