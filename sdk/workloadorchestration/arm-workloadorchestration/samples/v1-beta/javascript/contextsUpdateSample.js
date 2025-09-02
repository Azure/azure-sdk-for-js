// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an Context Resource
 *
 * @summary update an Context Resource
 * x-ms-original-file: 2025-06-01/Contexts_Update_MaximumSet_Gen.json
 */
async function contextsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.contexts.update("rgconfigurationmanager", "testname", {
    properties: {
      capabilities: [
        {
          name: "tpylinjcmlnycfpofpxjtqmt",
          description: "banbenutsngwytoqh",
          state: "active",
        },
      ],
      hierarchies: [{ name: "upqe", description: "vg" }],
    },
    tags: { key9545: "dhxykbzgliyqxxizttbjhuruhhv" },
  });
  console.log(result);
}

async function main() {
  await contextsUpdateMaximumSet();
}

main().catch(console.error);
