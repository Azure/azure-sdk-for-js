// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified NSP linkReference resource.
 *
 * @summary gets the specified NSP linkReference resource.
 * x-ms-original-file: 2025-05-01/NspLinkReferenceGet.json
 */
async function nspLinkReferencesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLinkReferences.get(
    "rg1",
    "nsp2",
    "link1-guid",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspLinkReferencesGet();
}

main().catch(console.error);
