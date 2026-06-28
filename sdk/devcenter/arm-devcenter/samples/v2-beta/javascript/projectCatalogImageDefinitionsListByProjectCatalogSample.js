// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Image Definitions in the catalog.
 *
 * @summary list Image Definitions in the catalog.
 * x-ms-original-file: 2026-01-01-preview/ImageDefinitions_ListByProjectCatalog.json
 */
async function imageDefinitionsListByProjectCatalog() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projectCatalogImageDefinitions.listByProjectCatalog(
    "rg1",
    "ContosoProject",
    "TeamCatalog",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await imageDefinitionsListByProjectCatalog();
}

main().catch(console.error);
