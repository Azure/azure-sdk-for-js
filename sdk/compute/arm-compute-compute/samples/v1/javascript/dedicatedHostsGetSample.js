// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a dedicated host.
 *
 * @summary retrieves information about a dedicated host.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Get.json
 */
async function getADedicatedHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.get(
    "myResourceGroup",
    "myDedicatedHostGroup",
    "myHost",
    { expand: "instanceView" },
  );
  console.log(result);
}

async function main() {
  await getADedicatedHost();
}

main().catch(console.error);
