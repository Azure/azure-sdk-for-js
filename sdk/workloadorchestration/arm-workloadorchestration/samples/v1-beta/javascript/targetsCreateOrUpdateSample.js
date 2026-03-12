// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadOrchestrationManagementClient } = require("@azure/arm-workloadorchestration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Target Resource
 *
 * @summary create or update a Target Resource
 * x-ms-original-file: 2025-06-01/Targets_CreateOrUpdate_MaximumSet_Gen.json
 */
async function targetsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.targets.createOrUpdate("rgconfigurationmanager", "testname", {
    properties: {
      description: "riabrxtvhlmizyhffdpjeyhvw",
      displayName: "qjlbshhqzfmwxvvynibkoi",
      targetSpecification: {},
      capabilities: ["grjapghdidoao"],
      contextId:
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}",
      hierarchyLevel: "octqptfirejhjfavlnfqeiikqx",
      status: {
        lastModified: new Date("2025-06-09T10:12:04.224Z"),
        deployed: 24,
        expectedRunningJobId: 19,
        runningJobId: 6,
        status: "nnpksn",
        statusDetails: "bslqqnfciczenaltdcmrgg",
        generation: 21,
        targetStatuses: [
          {
            name: "jpbfbxmjvr",
            status: "gsgkxfwtyoaepwa",
            componentStatuses: [
              {
                name: "lxzbkoblvaoubknkblwplf",
                status: "txtthlvducufbblgtctegtgpzkzgyi",
              },
            ],
          },
        ],
      },
      solutionScope: "testname",
      state: "active",
    },
    extendedLocation: { name: "szjrwimeqyiue", type: "EdgeZone" },
    tags: { key612: "vtqzrk" },
    location: "kckloegmwsjgwtcl",
  });
  console.log(result);
}

async function main() {
  await targetsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
