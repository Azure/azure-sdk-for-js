// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DisconnectedOperationsManagementClient } from "@azure/arm-disconnectedoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DisconnectedOperation resources by resource group
 *
 * @summary list DisconnectedOperation resources by resource group
 * x-ms-original-file: 2026-03-15/DisconnectedOperations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function disconnectedOperationsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disconnectedOperations.listByResourceGroup(
    "rgdisconnectedoperations",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await disconnectedOperationsListByResourceGroup();
}

main().catch(console.error);
