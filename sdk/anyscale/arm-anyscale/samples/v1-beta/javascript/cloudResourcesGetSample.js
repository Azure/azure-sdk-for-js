// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a cloud resource
 *
 * @summary get a cloud resource
 * x-ms-original-file: 2026-09-01/CloudResources_Get.json
 */
async function cloudResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.cloudResources.get(
    "rganyscale",
    "AnyscaleCloud",
    "AnyscaleCloudResource",
  );
  console.log(result);
}

async function main() {
  await cloudResourcesGet();
}

main().catch(console.error);
