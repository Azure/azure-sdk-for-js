// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a trusted Signing Account.
 *
 * @summary create a trusted Signing Account.
 * x-ms-original-file: 2024-02-05-preview/CodeSigningAccounts_Create.json
 */

import { CodeSigningClient } from "@azure/arm-trustedsigning";
import { DefaultAzureCredential } from "@azure/identity";

async function createATrustedSigningAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.create("MyResourceGroup", "MyAccount", {
    location: "westus",
    properties: { sku: { name: "Basic" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createATrustedSigningAccount();
}

main().catch(console.error);
