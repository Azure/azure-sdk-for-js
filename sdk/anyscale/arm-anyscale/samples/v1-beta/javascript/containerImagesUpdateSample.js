// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a container image.
 *
 * @summary updates a container image.
 * x-ms-original-file: 2026-09-01/ContainerImages_Update.json
 */
async function containerImagesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.containerImages.update(
    "rganyscale",
    "testcloud",
    "testcontainerimage",
    {
      properties: {
        containerfile:
          "FROM anyscale/ray:2.44.0-py312-cu124\nRUN pip install torch==2.1.0 transformers==4.36.0",
        containerImageUri: "myacr.azurecr.io/anyscale/my-ray-image:latest",
      },
    },
  );
  console.log(result);
}

async function main() {
  await containerImagesUpdate();
}

main().catch(console.error);
