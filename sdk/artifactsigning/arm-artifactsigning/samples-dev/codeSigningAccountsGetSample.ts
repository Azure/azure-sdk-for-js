// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-artifactsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an artifact Signing Account.
 *
 * @summary get an artifact Signing Account.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_Get.json
 */
async function getAnArtifactSigningAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.get("MyResourceGroup", "MyAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnArtifactSigningAccount();
}

main().catch(console.error);
