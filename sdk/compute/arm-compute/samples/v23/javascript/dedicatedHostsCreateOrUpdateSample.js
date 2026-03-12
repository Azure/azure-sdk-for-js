// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a dedicated host .
 *
 * @summary Create or update a dedicated host .
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/dedicatedHostExamples/DedicatedHost_CreateOrUpdate.json
 */
async function createOrUpdateADedicatedHost() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const hostGroupName = "myDedicatedHostGroup";
  const hostName = "myDedicatedHost";
  const parameters = {
    location: "westus",
    platformFaultDomain: 1,
    sku: { name: "DSv3-Type1" },
    tags: { department: "HR" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.beginCreateOrUpdateAndWait(
    resourceGroupName,
    hostGroupName,
    hostName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateADedicatedHost();
}

main().catch(console.error);
