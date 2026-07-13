// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists images for a devcenter.
 *
 * @summary lists images for a devcenter.
 * x-ms-original-file: 2026-01-01-preview/Images_ListByDevCenter.json
 */
async function imagesListByDevCenter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.images.listByDevCenter("rg1", "Contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await imagesListByDevCenter();
}

main().catch(console.error);
