// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicepreparedimgspec");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a prepared image specification at the latest version.
 *
 * @summary get a prepared image specification at the latest version.
 * x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_Get.json
 */
async function preparedImageSpecificationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.preparedImageSpecifications.get(
    "rg1",
    "my-prepared-image-specification",
  );
  console.log(result);
}

async function main() {
  await preparedImageSpecificationsGet();
}

main().catch(console.error);
