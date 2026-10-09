// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VerifiedIdClient } from "@azure/arm-verifiedid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Authority
 *
 * @summary create a Authority
 * x-ms-original-file: 2024-01-26-preview/Authorities_CreateOrUpdate.json
 */
async function createAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  const result = await client.authorities.createOrUpdate(
    "testrg",
    "00000000-0000-0000-0000-000000000111",
    { properties: {}, location: "westus" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAuthority();
}

main().catch(console.error);
