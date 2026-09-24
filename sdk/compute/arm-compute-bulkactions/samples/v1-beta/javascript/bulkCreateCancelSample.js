// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels BulkCreate instances that have not yet launched.
 *
 * @summary cancels BulkCreate instances that have not yet launched.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_Cancel_MaximumSet_Gen.json
 */
async function bulkCreateCancelMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  await client.bulkCreate.cancel("rgBulkactions", "eastus", "20496756-e4bc-402c-8e7e-8ffed8e00c41");
}

async function main() {
  await bulkCreateCancelMaximumSet();
}

main().catch(console.error);
