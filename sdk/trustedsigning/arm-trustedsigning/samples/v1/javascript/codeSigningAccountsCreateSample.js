// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-trustedsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a trusted Signing Account.
 *
 * @summary create a trusted Signing Account.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_Create.json
 */
async function createATrustedSigningAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.create("MyResourceGroup", "MyAccount", {
    location: "westus",
    properties: { sku: { name: "Basic" } },
  });
  console.log(result);
}

async function main() {
  await createATrustedSigningAccount();
}

main().catch(console.error);
