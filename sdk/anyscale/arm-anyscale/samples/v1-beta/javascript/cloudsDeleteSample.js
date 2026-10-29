// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a cloud resource
 *
 * @summary delete a cloud resource
 * x-ms-original-file: 2026-09-01/Clouds_Delete.json
 */
async function cloudsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.clouds.delete("rganyscale", "testcloud");
}

async function main() {
  await cloudsDelete();
}

main().catch(console.error);
