// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Pool resources by subscription ID
 *
 * @summary list Pool resources by subscription ID
 * x-ms-original-file: 2024-10-19/ListPoolsBySubscription.json
 */
async function poolsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.pools.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  poolsListBySubscription();
}

main().catch(console.error);
