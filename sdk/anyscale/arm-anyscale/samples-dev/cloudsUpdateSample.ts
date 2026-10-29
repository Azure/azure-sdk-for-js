// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a cloud resource
 *
 * @summary update a cloud resource
 * x-ms-original-file: 2026-09-01/Clouds_Update.json
 */
async function cloudsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.clouds.update("rganyscale", "testcloud", {
    tags: { environment: "production", team: "ml-platform" },
    properties: {
      acrResourceId:
        "/subscriptions/14AB8053-986C-414E-96B3-11D82B8B478D/resourceGroups/rganyscale/providers/Microsoft.ContainerRegistry/registries/anyscaleacr",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cloudsUpdate();
}

main().catch(console.error);
