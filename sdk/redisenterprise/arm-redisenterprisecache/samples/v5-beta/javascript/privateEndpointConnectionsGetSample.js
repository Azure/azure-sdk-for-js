// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the Redis Enterprise cluster.
 *
 * @summary gets the specified private endpoint connection associated with the Redis Enterprise cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseGetPrivateEndpointConnection.json
 */
async function redisEnterpriseGetPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get("rg1", "cache1", "pectest01");
  console.log(result);
}

async function main() {
  await redisEnterpriseGetPrivateEndpointConnection();
}

main().catch(console.error);
