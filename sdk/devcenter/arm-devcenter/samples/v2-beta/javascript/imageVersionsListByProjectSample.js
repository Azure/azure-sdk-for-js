// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists versions for an image.
 *
 * @summary lists versions for an image.
 * x-ms-original-file: 2026-01-01-preview/ImageVersions_ListByProject.json
 */
async function imageVersionsListByProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.imageVersions.listByProject(
    "rg1",
    "myProject",
    "~gallery~DefaultDevGallery~ContosoImageDefinition",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await imageVersionsListByProject();
}

main().catch(console.error);
