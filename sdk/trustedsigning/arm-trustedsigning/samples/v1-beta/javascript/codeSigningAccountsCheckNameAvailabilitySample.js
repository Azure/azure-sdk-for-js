// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-trustedsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the trusted signing account name is valid and is not already in use.
 *
 * @summary checks that the trusted signing account name is valid and is not already in use.
 * x-ms-original-file: 2024-02-05-preview/CodeSigningAccounts_CheckNameAvailability.json
 */
async function checksThatTheTrustedSigningAccountNameIsAvailable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.checkNameAvailability({
    name: "sample-account",
  });
  console.log(result);
}

async function main() {
  checksThatTheTrustedSigningAccountNameIsAvailable();
}

main().catch(console.error);
