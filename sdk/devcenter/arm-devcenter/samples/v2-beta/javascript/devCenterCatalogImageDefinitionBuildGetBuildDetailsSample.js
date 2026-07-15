// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Build details.
 *
 * @summary gets Build details.
 * x-ms-original-file: 2026-01-01-preview/DevCenterImageDefinitions_GetImageBuildDetails.json
 */
async function devCenterCatalogImageDefinitionBuildGetErrorDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devCenterCatalogImageDefinitionBuild.getBuildDetails(
    "rg1",
    "DevDevCenter",
    "CentralCatalog",
    "DefaultDevImage",
    "0a28fc61-6f87-4611-8fe2-32df44ab93b7",
  );
  console.log(result);
}

async function main() {
  await devCenterCatalogImageDefinitionBuildGetErrorDetails();
}

main().catch(console.error);
