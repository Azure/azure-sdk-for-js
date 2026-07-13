// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an associated project catalog.
 *
 * @summary gets an associated project catalog.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_Get.json
 */
async function projectCatalogsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogs.get("rg1", "DevProject", "CentralCatalog");
  console.log(result);
}

async function main() {
  await projectCatalogsGet();
}

main().catch(console.error);
