// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all SaaS resources within an Azure subscription.
 *
 * @summary lists all SaaS resources within an Azure subscription.
 * x-ms-original-file: 2026-04-01/SaasListBySubscription.json
 */
async function listSaaSSubscriptionLevelResourcesByAzureSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.saasSubscriptionLevelGlobal.listByAzureSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSaaSSubscriptionLevelResourcesByAzureSubscription();
}

main().catch(console.error);
