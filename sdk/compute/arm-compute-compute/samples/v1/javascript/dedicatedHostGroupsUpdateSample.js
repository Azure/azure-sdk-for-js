// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an dedicated host group.
 *
 * @summary update an dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Update_MaximumSet_Gen.json
 */
async function dedicatedHostGroupUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.update("rgcompute", "aaaa", {
    properties: {
      platformFaultDomainCount: 3,
      supportAutomaticPlacement: true,
      instanceView: {
        hosts: [
          {
            availableCapacity: {
              allocatableVMs: [{ vmSize: "aaaaaaaaaaaaaaaaaaaa", count: 26 }],
            },
            statuses: [
              {
                code: "aaaaaaaaaaaaaaaaaaaaaaa",
                level: "Info",
                displayStatus: "aaaaaa",
                message: "a",
                time: new Date("2021-11-30T12:58:26.522Z"),
              },
            ],
          },
        ],
      },
    },
    zones: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
    tags: { key9921: "aaaaaaaaaa" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update an dedicated host group.
 *
 * @summary update an dedicated host group.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_Update_MinimumSet_Gen.json
 */
async function dedicatedHostGroupUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.update("rgcompute", "aaaaaaaaaaa", {});
  console.log(result);
}

async function main() {
  await dedicatedHostGroupUpdateMaximumSetGen();
  await dedicatedHostGroupUpdateMinimumSetGen();
}

main().catch(console.error);
