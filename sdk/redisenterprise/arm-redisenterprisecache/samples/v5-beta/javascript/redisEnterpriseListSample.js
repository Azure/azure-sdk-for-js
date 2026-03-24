// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Redis Enterprise clusters in the specified subscription.
 *
 * @summary lists all Redis Enterprise clusters in the specified subscription.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseList.json
 */
async function redisEnterpriseList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.redisEnterprise.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await redisEnterpriseList();
}

main().catch(console.error);
