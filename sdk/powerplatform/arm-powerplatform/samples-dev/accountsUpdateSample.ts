// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformClient } from "@azure/arm-powerplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an account.
 *
 * @summary updates an account.
 * x-ms-original-file: 2020-10-30-preview/updateAccount.json
 */
async function updateAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.accounts.update("account", "resourceGroup", {
    location: "East US",
    description: "Description of account.",
    tags: { Organization: "Administration" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAccount();
}

main().catch(console.error);
