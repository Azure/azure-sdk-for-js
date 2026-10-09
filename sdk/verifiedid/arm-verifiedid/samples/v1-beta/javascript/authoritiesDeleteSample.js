// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VerifiedIdClient } = require("@azure/arm-verifiedid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Authority
 *
 * @summary delete a Authority
 * x-ms-original-file: 2024-01-26-preview/Authorities_Delete.json
 */
async function deleteAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  await client.authorities.delete("testrg", "00000000-0000-0000-0000-000000000111");
}

async function main() {
  await deleteAuthority();
}

main().catch(console.error);
