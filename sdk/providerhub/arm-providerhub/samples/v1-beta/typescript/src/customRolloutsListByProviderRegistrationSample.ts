// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of the custom rollouts for the given provider.
 *
 * @summary gets the list of the custom rollouts for the given provider.
 * x-ms-original-file: 2024-09-01/CustomRollouts_ListByProviderRegistration.json
 */
async function customRolloutsListByProviderRegistration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.customRollouts.listByProviderRegistration("Microsoft.Contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await customRolloutsListByProviderRegistration();
}

main().catch(console.error);
