// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the Security Partner Providers in a subscription.
 *
 * @summary gets all the Security Partner Providers in a subscription.
 * x-ms-original-file: 2025-05-01/SecurityPartnerProviderListBySubscription.json
 */
async function listAllSecurityPartnerProvidersForAGivenSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityPartnerProviders.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllSecurityPartnerProvidersForAGivenSubscription();
}

main().catch(console.error);
