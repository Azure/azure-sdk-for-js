// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Quota resources by subscription ID
 *
 * @summary list Quota resources by subscription ID
 * x-ms-original-file: 2024-10-19/SubscriptionUsages_Usages.json
 */
async function subscriptionUsagesUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.subscriptionUsages.usages("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  subscriptionUsagesUsages();
}

main().catch(console.error);
