// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list BulkCreateCustom resources by resource group.
 *
 * @summary list BulkCreateCustom resources by resource group.
 * x-ms-original-file: 2026-07-06-preview/BulkCreateCustom_ListByResourceGroup_MaximumSet_Gen.json
 */
async function bulkCreateCustomListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkCreateCustom.listByResourceGroup("rgBulkactions", "eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await bulkCreateCustomListByResourceGroupMaximumSet();
}

main().catch(console.error);
