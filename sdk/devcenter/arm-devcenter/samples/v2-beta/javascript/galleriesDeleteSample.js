// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a gallery resource.
 *
 * @summary deletes a gallery resource.
 * x-ms-original-file: 2026-01-01-preview/Galleries_Delete.json
 */
async function galleriesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.galleries.delete("rg1", "Contoso", "StandardGallery");
}

async function main() {
  await galleriesDelete();
}

main().catch(console.error);
