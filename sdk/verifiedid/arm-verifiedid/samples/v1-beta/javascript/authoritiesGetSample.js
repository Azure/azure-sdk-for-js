// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VerifiedIdClient } = require("@azure/arm-verifiedid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Authority
 *
 * @summary get a Authority
 * x-ms-original-file: 2024-01-26-preview/Authorities_Get.json
 */
async function getAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  const result = await client.authorities.get("testrg", "00000000-0000-0000-0000-000000000111");
  console.log(result);
}

async function main() {
  await getAuthority();
}

main().catch(console.error);
