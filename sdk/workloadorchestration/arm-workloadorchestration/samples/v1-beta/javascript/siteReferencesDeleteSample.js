// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Site Reference Resource
 *
 * @summary get Site Reference Resource
 * x-ms-original-file: 2026-05-01-preview/SiteReferences_Delete_MaximumSet_Gen.json
 */
async function siteReferencesDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  await client.siteReferences.delete("rgconfigurationmanager", "testname", "testname");
}

async function main() {
  await siteReferencesDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
