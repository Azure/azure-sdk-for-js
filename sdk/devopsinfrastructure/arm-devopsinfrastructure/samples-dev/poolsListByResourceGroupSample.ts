// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list Pool resources by resource group
 *
 * @summary list Pool resources by resource group
 * x-ms-original-file: 2024-10-19/ListPoolsBySubscriptionAndResourceGroup.json
 */

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

async function poolsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.pools.listByResourceGroup("rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await poolsListByResourceGroup();
}

main().catch(console.error);
