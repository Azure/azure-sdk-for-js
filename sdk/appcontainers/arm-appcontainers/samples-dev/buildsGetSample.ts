// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a BuildResource
 *
 * @summary get a BuildResource
 * x-ms-original-file: 2025-10-02-preview/Builds_Get.json
 */
async function buildsGet0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builds.get("rg", "testBuilder", "testBuild");
  console.log(result);
}

async function main(): Promise<void> {
  await buildsGet0();
}

main().catch(console.error);
