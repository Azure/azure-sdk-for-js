// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets the default account for the scope.
 *
 * @summary sets the default account for the scope.
 * x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Set.json
 */
async function defaultAccountsSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential);
  const result = await client.defaultAccounts.set({
    accountName: "myDefaultAccount",
    resourceGroupName: "rg-1",
    scope: "12345678-1234-1234-1234-12345678abcd",
    scopeTenantId: "12345678-1234-1234-1234-12345678abcd",
    scopeType: "Tenant",
    subscriptionId: "12345678-1234-1234-1234-12345678aaaa",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await defaultAccountsSet();
}

main().catch(console.error);
