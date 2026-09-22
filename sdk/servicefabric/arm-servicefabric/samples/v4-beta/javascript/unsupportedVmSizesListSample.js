// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceFabricManagementClient } = require("@azure/arm-servicefabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the lists of unsupported vm sizes for Service Fabric Clusters.
 *
 * @summary get the lists of unsupported vm sizes for Service Fabric Clusters.
 * x-ms-original-file: 2026-03-01-preview/UnsupportedVMSizesList_example.json
 */
async function listUnsupportedVmSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.unsupportedVmSizes.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listUnsupportedVmSizes();
}

main().catch(console.error);
