// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Image Definition error details.
 *
 * @summary gets Image Definition error details.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogImageDefinitions_GetErrorDetails.json
 */
async function projectCatalogImageDefinitionsGetErrorDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogImageDefinitions.getErrorDetails(
    "rg1",
    "DevProject",
    "TeamCatalog",
    "WebDevBox",
  );
  console.log(result);
}

async function main() {
  await projectCatalogImageDefinitionsGetErrorDetails();
}

main().catch(console.error);
