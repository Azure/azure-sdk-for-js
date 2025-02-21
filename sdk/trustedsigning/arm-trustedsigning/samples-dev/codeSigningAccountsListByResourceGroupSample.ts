// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-trustedsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists trusted signing accounts within a resource group.
 *
 * @summary lists trusted signing accounts within a resource group.
 * x-ms-original-file: 2024-02-05-preview/CodeSigningAccounts_ListByResourceGroup.json
 */
async function listsTrustedSigningAccountsWithinAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.codeSigningAccounts.listByResourceGroup("MyResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTrustedSigningAccountsWithinAResourceGroup();
}

main().catch(console.error);
