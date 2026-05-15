// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks whether the subscription is visible to private link service in the specified resource group.
 *
 * @summary checks whether the subscription is visible to private link service in the specified resource group.
 * x-ms-original-file: 2025-05-01/CheckPrivateLinkServiceVisibilityByResourceGroup.json
 */
async function checkPrivateLinkServiceVisibility(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.checkPrivateLinkServiceVisibilityByResourceGroup(
    "rg1",
    "westus",
    {
      privateLinkServiceAlias:
        "mypls.00000000-0000-0000-0000-000000000000.azure.privatelinkservice",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkPrivateLinkServiceVisibility();
}

main().catch(console.error);
