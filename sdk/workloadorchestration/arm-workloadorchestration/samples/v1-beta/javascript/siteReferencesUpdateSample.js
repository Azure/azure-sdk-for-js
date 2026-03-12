// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Site Reference Resource
 *
 * @summary get Site Reference Resource
 * x-ms-original-file: 2025-06-01/SiteReferences_Update_MaximumSet_Gen.json
 */
async function siteReferencesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.siteReferences.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    { properties: { siteId: "nwiuyaro" } },
  );
  console.log(result);
}

async function main() {
  await siteReferencesUpdateMaximumSet();
}

main().catch(console.error);
