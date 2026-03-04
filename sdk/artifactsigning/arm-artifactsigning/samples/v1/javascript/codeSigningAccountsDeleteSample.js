// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CodeSigningClient } = require("@azure/arm-artifactsigning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an artifact signing account.
 *
 * @summary delete an artifact signing account.
 * x-ms-original-file: 2025-10-13/CodeSigningAccounts_Delete.json
 */
async function deleteAnArtifactSigningAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CodeSigningClient(credential, subscriptionId);
  await client.codeSigningAccounts.delete("MyResourceGroup", "MyAccount");
}

async function main() {
  await deleteAnArtifactSigningAccount();
}

main().catch(console.error);
