// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified resource provider.
 *
 * @summary Gets the specified resource provider.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetProvider.json
 */

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getProvider(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceProviderNamespace = "Microsoft.TestRP1";
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.providers.get(resourceProviderNamespace);
  console.log(result);
}

async function main(): Promise<void> {
  await getProvider();
}

main().catch(console.error);
