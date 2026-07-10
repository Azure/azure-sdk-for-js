// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to partially updates a catalog.
 *
 * @summary partially updates a catalog.
 * x-ms-original-file: 2026-01-01-preview/Catalogs_Patch.json
 */
async function catalogsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.catalogs.update("rg1", "Contoso", "CentralCatalog", {
    gitHub: { path: "/environments" },
    syncType: "Scheduled",
    autoImageBuildEnableStatus: "Enabled",
  });
  console.log(result);
}

async function main() {
  await catalogsUpdate();
}

main().catch(console.error);
