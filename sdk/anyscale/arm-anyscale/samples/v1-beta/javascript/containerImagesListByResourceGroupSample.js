// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists container images in a cloud.
 *
 * @summary lists container images in a cloud.
 * x-ms-original-file: 2026-09-01/ContainerImages_ListByResourceGroup.json
 */
async function containerImagesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerImages.listByResourceGroup("rganyscale", "testcloud")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await containerImagesListByResourceGroup();
}

main().catch(console.error);
