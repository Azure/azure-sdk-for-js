// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-11-01/dedicatedHostExamples/DedicatedHost_Update_MaximumSet_Gen.json
 */
async function dedicatedHostUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.update(
    "rgcompute",
    "aaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaa",
    {
      platformFaultDomain: 1,
      autoReplaceOnFailure: true,
      licenseType: "Windows_Server_Hybrid",
      tags: { key8813: "aaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-11-01/dedicatedHostExamples/DedicatedHost_Update_MinimumSet_Gen.json
 */
async function dedicatedHostUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.update(
    "rgcompute",
    "aa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    {},
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a dedicated host .
 *
 * @summary update a dedicated host .
 * x-ms-original-file: 2025-11-01/dedicatedHostExamples/DedicatedHost_Update_Resize.json
 */
async function dedicatedHostUpdateResize() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.update(
    "rgcompute",
    "aaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaa",
    { sku: { name: "DSv3-Type1" } },
  );
  console.log(result);
}

async function main() {
  await dedicatedHostUpdateMaximumSetGen();
  await dedicatedHostUpdateMinimumSetGen();
  await dedicatedHostUpdateResize();
}

main().catch(console.error);
