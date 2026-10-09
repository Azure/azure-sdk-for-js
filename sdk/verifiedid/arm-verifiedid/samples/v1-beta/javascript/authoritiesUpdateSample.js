// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VerifiedIdClient } = require("@azure/arm-verifiedid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Authority
 *
 * @summary update a Authority
 * x-ms-original-file: 2024-01-26-preview/Authorities_Update.json
 */
async function updateAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  const result = await client.authorities.update(
    "testrg",
    "00000000-0000-0000-0000-000000000111",
    {},
  );
  console.log(result);
}

async function main() {
  await updateAuthority();
}

main().catch(console.error);
