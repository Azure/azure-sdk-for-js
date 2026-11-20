// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an instance of BulkCreates.
 *
 * @summary gets an instance of BulkCreates.
 * x-ms-original-file: 2026-10-16/BulkCreate_Get.json
 */
async function getACompletedBulkCreateOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreate.get(
    "rg-bulk-create",
    "eastus",
    "fb5e3fe5-f509-4d7c-8f6a-fe65eeef921e",
  );
  console.log(result);
}

async function main() {
  await getACompletedBulkCreateOperation();
}

main().catch(console.error);
