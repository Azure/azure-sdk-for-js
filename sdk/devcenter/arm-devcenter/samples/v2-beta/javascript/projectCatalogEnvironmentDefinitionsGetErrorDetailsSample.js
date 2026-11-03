// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Environment Definition error details.
 *
 * @summary gets Environment Definition error details.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogEnvironmentDefinitions_GetErrorDetails.json
 */
async function projectCatalogEnvironmentDefinitionsGetErrorDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectCatalogEnvironmentDefinitions.getErrorDetails(
    "rg1",
    "DevProject",
    "myCatalog",
    "myEnvironmentDefinition",
  );
  console.log(result);
}

async function main() {
  await projectCatalogEnvironmentDefinitionsGetErrorDetails();
}

main().catch(console.error);
