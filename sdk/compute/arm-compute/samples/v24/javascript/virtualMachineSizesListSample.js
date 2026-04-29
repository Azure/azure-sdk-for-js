// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 *
 * @summary this API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 * x-ms-original-file: 2025-11-01/computeRPCommonExamples/VirtualMachineSizes_List_MaximumSet_Gen.json
 */
async function virtualMachineSizesListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineSizes.list("-e")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to this API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 *
 * @summary this API is deprecated. Use [Resources Skus](https://docs.microsoft.com/rest/api/compute/resourceskus/list)
 * x-ms-original-file: 2025-11-01/computeRPCommonExamples/VirtualMachineSizes_List_MinimumSet_Gen.json
 */
async function virtualMachineSizesListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineSizes.list("._..")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineSizesListMaximumSetGen();
  await virtualMachineSizesListMinimumSetGen();
}

main().catch(console.error);
