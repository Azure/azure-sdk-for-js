// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-trustedsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a trusted signing account.
 *
 * @summary update a trusted signing account.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_Update.json
 */
async function updateATrustedSigningAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.update("MyResourceGroup", "MyAccount", {
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await updateATrustedSigningAccount();
}

main().catch(console.error);
