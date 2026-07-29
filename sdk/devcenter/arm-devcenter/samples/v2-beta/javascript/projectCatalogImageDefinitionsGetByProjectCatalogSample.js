// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Image Definition from the catalog.
 *
 * @summary gets an Image Definition from the catalog.
 * x-ms-original-file: 2026-01-01-preview/ImageDefinitions_GetByProjectCatalog.json
 */
async function imageDefinitionsGetByProjectCatalog() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogImageDefinitions.getByProjectCatalog(
    "rg1",
    "ContosoProject",
    "TeamCatalog",
    "WebDevBox",
  );
  console.log(result);
}

async function main() {
  await imageDefinitionsGetByProjectCatalog();
}

main().catch(console.error);
