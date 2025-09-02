// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove Config Template Version Resource
 *
 * @summary remove Config Template Version Resource
 * x-ms-original-file: 2025-06-01/ConfigTemplates_RemoveVersion_MaximumSet_Gen.json
 */
async function configTemplatesRemoveVersionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplates.removeVersion("rgconfigurationmanager", "testname", {
    version: "ghtvdzgmzncaifrnuumg",
  });
  console.log(result);
}

async function main() {
  await configTemplatesRemoveVersionMaximumSet();
}

main().catch(console.error);
