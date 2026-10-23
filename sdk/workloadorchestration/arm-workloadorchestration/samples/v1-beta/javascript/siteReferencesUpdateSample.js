// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Site Reference Resource
 *
 * @summary get Site Reference Resource
 * x-ms-original-file: 2026-05-01-preview/SiteReferences_Update_MaximumSet_Gen.json
 */
async function siteReferencesUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.siteReferences.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    { properties: { siteId: "cifefexczjlpyn" } },
  );
  console.log(result);
}

async function main() {
  await siteReferencesUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
