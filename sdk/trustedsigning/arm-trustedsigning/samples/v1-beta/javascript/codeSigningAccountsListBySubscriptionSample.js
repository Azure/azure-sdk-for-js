// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-trustedsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists trusted signing accounts within a subscription.
 *
 * @summary lists trusted signing accounts within a subscription.
 * x-ms-original-file: 2024-02-05-preview/CodeSigningAccounts_ListBySubscription.json
 */
async function listsTrustedSigningAccountsWithinASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.codeSigningAccounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listsTrustedSigningAccountsWithinASubscription();
}

main().catch(console.error);
