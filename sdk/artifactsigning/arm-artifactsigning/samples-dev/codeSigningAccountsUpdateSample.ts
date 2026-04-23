// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-artifactsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an artifact signing account.
 *
 * @summary update an artifact signing account.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_Update.json
 */
async function updateAnArtifactSigningAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.update("MyResourceGroup", "MyAccount", {
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnArtifactSigningAccount();
}

main().catch(console.error);
