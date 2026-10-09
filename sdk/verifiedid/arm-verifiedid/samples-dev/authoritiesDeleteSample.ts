// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VerifiedIdClient } from "@azure/arm-verifiedid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Authority
 *
 * @summary delete a Authority
 * x-ms-original-file: 2024-01-26-preview/Authorities_Delete.json
 */
async function deleteAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  await client.authorities.delete("testrg", "00000000-0000-0000-0000-000000000111");
}

async function main(): Promise<void> {
  await deleteAuthority();
}

main().catch(console.error);
