// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the usage quota configuration
 *
 * @summary get the usage quota configuration
 * x-ms-original-file: 2024-04-01-preview/Usages_Get.json
 */
async function usagesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.usages.get("West US 2");
  console.log(result);
}

async function main(): Promise<void> {
  await usagesGet();
}

main().catch(console.error);
