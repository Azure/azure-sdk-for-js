// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to for checking the ongoing status of an operation
 *
 * @summary for checking the ongoing status of an operation
 * x-ms-original-file: 2024-11-01/RedisCacheAsyncOperationStatus.json
 */
async function redisCacheAsyncOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.asyncOperationStatus.get(
    "East US",
    "c7ba2bf5-5939-4d79-b037-2964ccf097da",
  );
  console.log(result);
}

async function main() {
  await redisCacheAsyncOperationStatus();
}

main().catch(console.error);
