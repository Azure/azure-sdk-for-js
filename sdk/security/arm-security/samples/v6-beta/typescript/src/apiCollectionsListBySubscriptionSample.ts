// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of API collections within a subscription that have been onboarded to Microsoft Defender for APIs.
 *
 * @summary gets a list of API collections within a subscription that have been onboarded to Microsoft Defender for APIs.
 * x-ms-original-file: 2023-11-15/ApiCollections/APICollections_ListBySubscription_example.json
 */
async function getsAListOfAPICollectionsWithinASubscriptionThatHaveBeenOnboardedToMicrosoftDefenderForAPIs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiCollections.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAListOfAPICollectionsWithinASubscriptionThatHaveBeenOnboardedToMicrosoftDefenderForAPIs();
}

main().catch(console.error);
