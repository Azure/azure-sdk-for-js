// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596)
 *
 * @summary create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596)
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_CreateOrUpdate.json
 */
async function createOrUpdateADedicatedHostGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.createOrUpdate(
    "myResourceGroup",
    "myDedicatedHostGroup",
    {
      location: "westus",
      tags: { department: "finance" },
      zones: ["1"],
      properties: {
        platformFaultDomainCount: 3,
        supportAutomaticPlacement: true,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596)
 *
 * @summary create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596)
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHostGroup_CreateOrUpdate_WithUltraSSD.json
 */
async function createOrUpdateADedicatedHostGroupWithUltraSSDSupport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.createOrUpdate(
    "myResourceGroup",
    "myDedicatedHostGroup",
    {
      location: "westus",
      tags: { department: "finance" },
      zones: ["1"],
      properties: {
        platformFaultDomainCount: 3,
        supportAutomaticPlacement: true,
        additionalCapabilities: { ultraSSDEnabled: true },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateADedicatedHostGroup();
  await createOrUpdateADedicatedHostGroupWithUltraSSDSupport();
}

main().catch(console.error);
