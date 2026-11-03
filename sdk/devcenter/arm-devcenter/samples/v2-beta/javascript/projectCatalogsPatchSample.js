// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to partially updates a project catalog.
 *
 * @summary partially updates a project catalog.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_Patch.json
 */
async function projectCatalogsPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogs.patch("rg1", "DevProject", "CentralCatalog", {
    gitHub: { path: "/environments" },
  });
  console.log(result);
}

async function main() {
  await projectCatalogsPatch();
}

main().catch(console.error);
