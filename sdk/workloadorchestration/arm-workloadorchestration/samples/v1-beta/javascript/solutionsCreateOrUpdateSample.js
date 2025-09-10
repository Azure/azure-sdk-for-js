// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Solution Resource
 *
 * @summary create or update a Solution Resource
 * x-ms-original-file: 2025-06-01/Solutions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function solutionsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.solutions.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    {
      properties: {},
      extendedLocation: { name: "szjrwimeqyiue", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main() {
  await solutionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
