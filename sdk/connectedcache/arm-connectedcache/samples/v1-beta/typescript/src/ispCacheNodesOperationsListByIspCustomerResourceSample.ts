// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api retrieves information about all ispCacheNode resources under the given subscription and resource group
 *
 * @summary this api retrieves information about all ispCacheNode resources under the given subscription and resource group
 * x-ms-original-file: 2023-05-01-preview/IspCacheNodesOperations_ListByIspCustomerResource_MaximumSet_Gen.json
 */
async function ispCacheNodesOperationsListByIspCustomerResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.ispCacheNodesOperations.listByIspCustomerResource(
    "rgConnectedCache",
    "MccRPTest1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  ispCacheNodesOperationsListByIspCustomerResource();
}

main().catch(console.error);
