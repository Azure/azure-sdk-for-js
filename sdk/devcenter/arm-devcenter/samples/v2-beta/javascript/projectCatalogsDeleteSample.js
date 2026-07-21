// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a project catalog resource.
 *
 * @summary deletes a project catalog resource.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_Delete.json
 */
async function projectCatalogsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectCatalogs.delete("rg1", "DevProject", "CentralCatalog");
}

async function main() {
  await projectCatalogsDelete();
}

main().catch(console.error);
