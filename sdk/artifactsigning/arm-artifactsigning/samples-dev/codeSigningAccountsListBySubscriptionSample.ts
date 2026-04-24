// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningClient } from "@azure/arm-artifactsigning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists artifact signing accounts within a subscription.
 *
 * @summary lists artifact signing accounts within a subscription.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_ListBySubscription.json
 */
async function listsArtifactSigningAccountsWithinASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.codeSigningAccounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsArtifactSigningAccountsWithinASubscription();
}

main().catch(console.error);
