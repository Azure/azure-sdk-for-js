// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-artifactsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists artifact signing accounts within a subscription.
 *
 * @summary lists artifact signing accounts within a subscription.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_ListBySubscription.json
 */
async function listsArtifactSigningAccountsWithinASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.codeSigningAccounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsArtifactSigningAccountsWithinASubscription();
}

main().catch(console.error);
