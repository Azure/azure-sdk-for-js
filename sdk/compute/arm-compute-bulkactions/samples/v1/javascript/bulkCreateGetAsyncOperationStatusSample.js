// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the status of an async operation of a BulkCreate.
 *
 * @summary get the status of an async operation of a BulkCreate.
 * x-ms-original-file: 2026-10-16/BulkCreate_GetAsyncOperationStatus.json
 */
async function getTheStatusOfACompletedBulkCreateOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreate.getAsyncOperationStatus(
    "eastus",
    "58dcb168-d2d0-42a2-8c38-b2650682c369",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the status of an async operation of a BulkCreate.
 *
 * @summary get the status of an async operation of a BulkCreate.
 * x-ms-original-file: 2026-10-16/BulkCreate_GetAsyncOperationStatus_Failed.json
 */
async function getTheStatusOfAFailedBulkCreateOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreate.getAsyncOperationStatus(
    "eastus",
    "cbdbac52-dad1-4c54-81e1-972427ecd140",
  );
  console.log(result);
}

async function main() {
  await getTheStatusOfACompletedBulkCreateOperation();
  await getTheStatusOfAFailedBulkCreateOperation();
}

main().catch(console.error);
