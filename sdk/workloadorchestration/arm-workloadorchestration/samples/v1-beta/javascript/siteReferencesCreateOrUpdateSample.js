// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Site Reference Resource
 *
 * @summary get Site Reference Resource
 * x-ms-original-file: 2026-05-01-preview/SiteReferences_CreateOrUpdate_MaximumSet_Gen.json
 */
async function siteReferencesCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.siteReferences.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    { properties: { siteId: "gaehctrehvyhasstg" } },
  );
  console.log(result);
}

async function main() {
  await siteReferencesCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
