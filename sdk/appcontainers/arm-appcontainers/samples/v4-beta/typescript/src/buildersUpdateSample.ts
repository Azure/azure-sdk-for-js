// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a BuilderResource
 *
 * @summary update a BuilderResource
 * x-ms-original-file: 2025-10-02-preview/Builders_Update.json
 */
async function buildersUpdate0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.builders.update("rg", "testBuilder", {
    tags: { mytag1: "myvalue1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await buildersUpdate0();
}

main().catch(console.error);
