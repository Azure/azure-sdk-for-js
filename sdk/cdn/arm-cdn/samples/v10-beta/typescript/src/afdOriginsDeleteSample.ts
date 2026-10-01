// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing origin within an origin group.
 *
 * @summary deletes an existing origin within an origin group.
 * x-ms-original-file: 2025-12-01/AFDOrigins_Delete.json
 */
async function afdOriginsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.afdOrigins.delete("RG", "profile1", "origingroup1", "origin1");
}

async function main(): Promise<void> {
  await afdOriginsDelete();
}

main().catch(console.error);
