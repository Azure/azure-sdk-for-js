// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api retrieves information about all ispCacheNode resources under the given subscription and resource group
 *
 * @summary this api retrieves information about all ispCacheNode resources under the given subscription and resource group
 * x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_ListByEnterpriseMccCustomerResource_MaximumSet_Gen.json
 */
async function enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.enterpriseMccCacheNodesOperations.listByEnterpriseMccCustomerResource(
    "rgConnectedCache",
    "syjjjzk",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResource();
}

main().catch(console.error);
