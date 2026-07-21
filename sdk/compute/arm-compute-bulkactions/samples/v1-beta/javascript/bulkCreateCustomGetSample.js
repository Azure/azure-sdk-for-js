// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an instance of BulkCreateCustoms.
 *
 * @summary gets an instance of BulkCreateCustoms.
 * x-ms-original-file: 2026-07-06-preview/BulkCreateCustom_Get_MaximumSet_Gen.json
 */
async function bulkCreateCustomGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.get(
    "rgBulkactions",
    "eastus",
    "85c374f7-9857-4fd7-9267-81019219c362",
  );
  console.log(result);
}

async function main() {
  await bulkCreateCustomGetMaximumSet();
}

main().catch(console.error);
