// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicepreparedimgspec");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all versions of a prepared image specification.
 *
 * @summary list all versions of a prepared image specification.
 * x-ms-original-file: 2026-02-02-preview/PreparedImageSpecifications_ListVersions.json
 */
async function preparedImageSpecificationsListVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.preparedImageSpecifications.listVersions(
    "rg1",
    "my-prepared-image-specification",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await preparedImageSpecificationsListVersions();
}

main().catch(console.error);
