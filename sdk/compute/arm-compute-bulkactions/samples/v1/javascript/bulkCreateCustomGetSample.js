// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an instance of BulkCreateCustoms.
 *
 * @summary gets an instance of BulkCreateCustoms.
 * x-ms-original-file: 2026-10-16/BulkCreateCustom_Get.json
 */
async function getACompletedBulkCreateCustomOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.get(
    "rg-bulk-create",
    "eastus",
    "a1223fe4-126f-4905-a870-6d53e360cab5",
  );
  console.log(result);
}

async function main() {
  await getACompletedBulkCreateCustomOperation();
}

main().catch(console.error);
