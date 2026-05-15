// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an NSP LinkReference resource.
 *
 * @summary deletes an NSP LinkReference resource.
 * x-ms-original-file: 2025-05-01/NspLinkReferenceDelete.json
 */
async function nspLinkReferenceDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterLinkReferences.delete("rg1", "nsp2", "link1-guid");
}

async function main(): Promise<void> {
  await nspLinkReferenceDelete();
}

main().catch(console.error);
