// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of operation.
 *
 * @summary gets the status of operation.
 * x-ms-original-file: 2025-08-01-preview/OperationsStatusGet.json
 */
async function operationsStatusGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.operationsStatus.get("West US", "testoperationid");
  console.log(result);
}

async function main() {
  await operationsStatusGet();
}

main().catch(console.error);
