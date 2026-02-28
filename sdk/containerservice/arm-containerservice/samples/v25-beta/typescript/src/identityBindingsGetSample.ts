// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Identity Binding.
 *
 * @summary gets the specified Identity Binding.
 * x-ms-original-file: 2025-10-02-preview/IdentityBindings_Get.json
 */
async function getIdentityBinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.identityBindings.get("rg1", "clustername1", "identitybinding1");
  console.log(result);
}

async function main(): Promise<void> {
  await getIdentityBinding();
}

main().catch(console.error);
