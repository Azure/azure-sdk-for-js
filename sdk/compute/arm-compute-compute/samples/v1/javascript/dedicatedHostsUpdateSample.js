// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Update_MaximumSet_Gen.json
 */
async function dedicatedHostUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.dedicatedHosts.update("rgcompute", "aaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaa", {
    properties: {
      platformFaultDomain: 1,
      autoReplaceOnFailure: true,
      licenseType: "Windows_Server_Hybrid",
      instanceView: {
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
    },
    tags: { key8813: "aaaaaaaaaaaaaaaaaaaaaaaaaaa" },
  });
}

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Update_MinimumSet_Gen.json
 */
async function dedicatedHostUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.dedicatedHosts.update("rgcompute", "aa", "aaaaaaaaaaaaaaaaaaaaaaaaaa", {});
}

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Update_Resize.json
 */
async function dedicatedHostUpdateResize() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.dedicatedHosts.update("rgcompute", "aaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaa", {
    sku: { name: "DSv3-Type1" },
  });
}

async function main() {
  await dedicatedHostUpdateMaximumSetGen();
  await dedicatedHostUpdateMinimumSetGen();
  await dedicatedHostUpdateResize();
}

main().catch(console.error);
