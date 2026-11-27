// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProfessionalServiceClient } from "@azure/arm-professionalservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Professional Service resources within an Azure subscription.
 *
 * @summary lists all Professional Service resources within an Azure subscription.
 * x-ms-original-file: 2026-05-01/ProfessionalServiceListBySubscription.json
 */
async function listProfessionalServiceSubscriptionLevelResourcesByAzureSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new ProfessionalServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.professionalServiceSubscriptionLevelGlobal.listByAzureSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listProfessionalServiceSubscriptionLevelResourcesByAzureSubscription();
}

main().catch(console.error);
