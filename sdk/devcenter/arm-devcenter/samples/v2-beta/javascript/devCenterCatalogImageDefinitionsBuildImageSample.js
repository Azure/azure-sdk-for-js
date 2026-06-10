// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to builds an image for the specified Image Definition.
 *
 * @summary builds an image for the specified Image Definition.
 * x-ms-original-file: 2026-01-01-preview/DevCenterImageDefinitions_BuildImage.json
 */
async function devCenterCatalogImageDefinitionsBuildImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.devCenterCatalogImageDefinitions.buildImage(
    "rg1",
    "DevDevCenter",
    "CentralCatalog",
    "DefaultDevImage",
  );
}

async function main() {
  await devCenterCatalogImageDefinitionsBuildImage();
}

main().catch(console.error);
