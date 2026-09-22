// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a devcenter.
 *
 * @summary gets a devcenter.
 * x-ms-original-file: 2026-01-01-preview/DevCenters_Get.json
 */
async function devCentersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenters.get("rg1", "Contoso");
  console.log(result);
}

async function main() {
  await devCentersGet();
}

main().catch(console.error);
