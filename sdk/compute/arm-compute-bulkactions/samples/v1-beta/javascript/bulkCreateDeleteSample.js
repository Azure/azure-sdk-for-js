// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes BulkCreates.
 *
 * @summary deletes BulkCreates.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_Delete_MaximumSet_Gen.json
 */
async function bulkCreateDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  await client.bulkCreate.delete(
    "rgBulkactions",
    "eastus",
    "709c2556-6a82-45ee-ba68-b935bb4e8ba0",
    { deleteInstances: true },
  );
}

async function main() {
  await bulkCreateDeleteMaximumSet();
}

main().catch(console.error);
