// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a dedicated host .
 *
 * @summary create or update a dedicated host .
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_CreateOrUpdate.json
 */
async function createOrUpdateADedicatedHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.createOrUpdate(
    "myResourceGroup",
    "myDedicatedHostGroup",
    "myDedicatedHost",
    {
      location: "westus",
      tags: { department: "HR" },
      platformFaultDomain: 1,
      sku: { name: "DSv3-Type1" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateADedicatedHost();
}

main().catch(console.error);
