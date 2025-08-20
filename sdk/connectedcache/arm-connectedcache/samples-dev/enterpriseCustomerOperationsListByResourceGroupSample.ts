// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to retrieves the properties of all ConnectedCache enterpriseCustomers
 *
 * @summary retrieves the properties of all ConnectedCache enterpriseCustomers
 * x-ms-original-file: 2023-05-01-preview/EnterpriseCustomerOperations_ListByResourceGroup_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function enterpriseCustomerOperationsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.enterpriseCustomerOperations.listByResourceGroup(
    "rgConnectedCache",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await enterpriseCustomerOperationsListByResourceGroup();
}

main().catch(console.error);
