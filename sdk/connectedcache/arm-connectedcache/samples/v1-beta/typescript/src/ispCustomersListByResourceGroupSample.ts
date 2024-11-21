// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api gets the information about all ispCustomer resources under the given subscription and resource group
 *
 * @summary this api gets the information about all ispCustomer resources under the given subscription and resource group
 * x-ms-original-file: 2023-05-01-preview/IspCustomers_ListByResourceGroup_MaximumSet_Gen.json
 */
async function ispCustomersResourceListByResourceGroupGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.ispCustomers.listByResourceGroup(
    "rgConnectedCache",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  ispCustomersResourceListByResourceGroupGeneratedByMaximumSetRule();
}

main().catch(console.error);
