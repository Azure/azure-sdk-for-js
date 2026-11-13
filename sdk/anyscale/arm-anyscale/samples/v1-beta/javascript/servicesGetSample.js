// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a service.
 *
 * @summary gets a service.
 * x-ms-original-file: 2026-09-01/Services_Get.json
 */
async function servicesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.services.get("rganyscale", "testcloud", "testproject", "testservice");
  console.log(result);
}

async function main() {
  await servicesGet();
}

main().catch(console.error);
