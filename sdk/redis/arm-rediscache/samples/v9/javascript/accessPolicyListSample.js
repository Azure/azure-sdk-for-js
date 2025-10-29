// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of access policies associated with this redis cache
 *
 * @summary gets the list of access policies associated with this redis cache
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyList.json
 */
async function redisCacheAccessPolicyList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessPolicy.list("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await redisCacheAccessPolicyList();
}

main().catch(console.error);
