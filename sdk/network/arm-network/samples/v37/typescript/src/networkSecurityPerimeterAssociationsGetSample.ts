// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified NSP association by name.
 *
 * @summary gets the specified NSP association by name.
 * x-ms-original-file: 2025-05-01/NspAssociationGet.json
 */
async function nspAssociationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAssociations.get(
    "rg1",
    "nsp1",
    "association1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAssociationGet();
}

main().catch(console.error);
