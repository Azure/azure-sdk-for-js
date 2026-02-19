// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-artifactsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an artifact Signing Account.
 *
 * @summary get an artifact Signing Account.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_Get.json
 */
async function getAnArtifactSigningAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  const result = await client.codeSigningAccounts.get("MyResourceGroup", "MyAccount");
  console.log(result);
}

async function main() {
  await getAnArtifactSigningAccount();
}

main().catch(console.error);
