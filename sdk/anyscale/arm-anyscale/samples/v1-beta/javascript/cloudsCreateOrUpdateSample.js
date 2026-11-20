// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a cloud resource
 *
 * @summary create or update a cloud resource
 * x-ms-original-file: 2026-09-01/Clouds_CreateOrUpdate.json
 */
async function cloudsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.clouds.createOrUpdate("rganyscale", "testcloud", {
    properties: {
      acrResourceId:
        "/subscriptions/14AB8053-986C-414E-96B3-11D82B8B478D/resourceGroups/rganyscale/providers/Microsoft.ContainerRegistry/registries/anyscaleacr",
    },
    tags: { environment: "production", team: "ml-platform" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await cloudsCreateOrUpdate();
}

main().catch(console.error);
