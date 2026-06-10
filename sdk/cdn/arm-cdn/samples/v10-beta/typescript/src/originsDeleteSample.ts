// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing origin within an endpoint.
 *
 * @summary deletes an existing origin within an endpoint.
 * x-ms-original-file: 2025-12-01/Origins_Delete.json
 */
async function originsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.origins.delete("RG", "profile1", "endpoint1", "origin1");
}

async function main(): Promise<void> {
  await originsDelete();
}

main().catch(console.error);
