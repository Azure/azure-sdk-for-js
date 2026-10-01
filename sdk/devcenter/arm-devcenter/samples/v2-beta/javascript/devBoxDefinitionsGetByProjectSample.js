// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Dev Box definition configured for a project.
 *
 * @summary gets a Dev Box definition configured for a project.
 * x-ms-original-file: 2026-01-01-preview/DevBoxDefinitions_GetByProject.json
 */
async function devBoxDefinitionsGetByProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devBoxDefinitions.getByProject("rg1", "ContosoProject", "WebDevBox");
  console.log(result);
}

async function main() {
  await devBoxDefinitionsGetByProject();
}

main().catch(console.error);
