// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified resource provider.
 *
 * @summary gets the specified resource provider.
 * x-ms-original-file: 2025-04-01/GetProvider.json
 */
async function getProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.providers.get("Microsoft.TestRP1");
  console.log(result);
}

async function main(): Promise<void> {
  await getProvider();
}

main().catch(console.error);
