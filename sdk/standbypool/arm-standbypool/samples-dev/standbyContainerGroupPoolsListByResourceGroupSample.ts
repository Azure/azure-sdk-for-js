// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list StandbyContainerGroupPoolResource resources by resource group
 *
 * @summary list StandbyContainerGroupPoolResource resources by resource group
 * x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_ListByResourceGroup.json
 */
async function standbyContainerGroupPoolsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.standbyContainerGroupPools.listByResourceGroup("rgstandbypool")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await standbyContainerGroupPoolsListByResourceGroup();
}

main().catch(console.error);
