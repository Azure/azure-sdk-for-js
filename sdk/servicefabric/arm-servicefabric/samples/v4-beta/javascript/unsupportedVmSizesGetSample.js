// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get unsupported vm size for Service Fabric Clusters.
 *
 * @summary get unsupported vm size for Service Fabric Clusters.
 * x-ms-original-file: 2026-03-01-preview/UnsupportedVMSizesGet_example.json
 */
async function getUnsupportedVmSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.unsupportedVmSizes.get("eastus", "Standard_B1ls1");
  console.log(result);
}

async function main() {
  await getUnsupportedVmSizes();
}

main().catch(console.error);
