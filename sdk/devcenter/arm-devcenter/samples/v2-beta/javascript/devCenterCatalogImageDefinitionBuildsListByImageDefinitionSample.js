// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists builds for a specified image definition.
 *
 * @summary lists builds for a specified image definition.
 * x-ms-original-file: 2026-01-01-preview/DevCenterImageDefinitions_ListImageBuildsByImageDefinition.json
 */
async function devCenterImageDefinitionBuildsListByImageDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devCenterCatalogImageDefinitionBuilds.listByImageDefinition(
    "rg1",
    "DevDevCenter",
    "CentralCatalog",
    "DefaultDevImage",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await devCenterImageDefinitionBuildsListByImageDefinition();
}

main().catch(console.error);
