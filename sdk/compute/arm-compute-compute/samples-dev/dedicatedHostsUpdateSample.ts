// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Update_MaximumSet_Gen.json
 */
async function dedicatedHostUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
async function dedicatedHostUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHosts.update("rgcompute", "aa", "aaaaaaaaaaaaaaaaaaaaaaaaaa", {});
}

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Update_Resize.json
 */
async function dedicatedHostUpdateResize(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHosts.update("rgcompute", "aaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaa", {
    sku: { name: "DSv3-Type1" },
  });
}

async function main(): Promise<void> {
  await dedicatedHostUpdateMaximumSetGen();
  await dedicatedHostUpdateMinimumSetGen();
  await dedicatedHostUpdateResize();
}

main().catch(console.error);
