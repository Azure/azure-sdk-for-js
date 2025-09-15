// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified token.
 *
 * @summary gets the properties of the specified token.
 * x-ms-original-file: 2025-05-01-preview/TokenGet.json
 */
async function tokenGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.tokens.get("myResourceGroup", "myRegistry", "myToken");
  console.log(result);
}

async function main(): Promise<void> {
  await tokenGet();
}

main().catch(console.error);
