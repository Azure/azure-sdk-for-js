// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to syncs templates for a template source.
 *
 * @summary syncs templates for a template source.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_Sync.json
 */
async function projectCatalogsSync() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectCatalogs.sync("rg1", "DevProject", "CentralCatalog");
}

async function main() {
  await projectCatalogsSync();
}

main().catch(console.error);
