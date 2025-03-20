// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-trustedsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a trusted signing account.
 *
 * @summary delete a trusted signing account.
 * x-ms-original-file: 2024-02-05-preview/CodeSigningAccounts_Delete.json
 */
async function deleteATrustedSigningAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  await client.codeSigningAccounts.delete("MyResourceGroup", "MyAccount");
}

async function main(): Promise<void> {
  await deleteATrustedSigningAccount();
}

main().catch(console.error);
