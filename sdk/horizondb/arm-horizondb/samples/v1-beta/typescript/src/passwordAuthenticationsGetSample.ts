// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the service-created PostgreSQL username-and-password authentication method.
 *
 * @summary gets the service-created PostgreSQL username-and-password authentication method.
 * x-ms-original-file: 2026-10-01-preview/PasswordAuthentications_Get.json
 */
async function getThePasswordAuthenticationMethod(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.passwordAuthentications.get(
    "example-resource-group",
    "example-cluster",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getThePasswordAuthenticationMethod();
}

main().catch(console.error);
