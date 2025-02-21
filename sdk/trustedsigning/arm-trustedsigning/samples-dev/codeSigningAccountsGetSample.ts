// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-trustedsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a trusted Signing Account.
 *
 * @summary get a trusted Signing Account.
 * x-ms-original-file: 2024-02-05-preview/CodeSigningAccounts_Get.json
 */
async function getATrustedSigningAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.get("MyResourceGroup", "MyAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await getATrustedSigningAccount();
}

main().catch(console.error);
