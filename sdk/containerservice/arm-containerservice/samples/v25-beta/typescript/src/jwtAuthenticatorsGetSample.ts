// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified JWT authenticator of a managed cluster.
 *
 * @summary gets the specified JWT authenticator of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/JWTAuthenticators_Get.json
 */
async function getJWTAuthenticator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.jwtAuthenticators.get("rg1", "clustername1", "jwt1");
  console.log(result);
}

async function main(): Promise<void> {
  await getJWTAuthenticator();
}

main().catch(console.error);
