// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels the specified build for an image definition.
 *
 * @summary cancels the specified build for an image definition.
 * x-ms-original-file: 2026-01-01-preview/ImageDefinitions_CancelImageBuild.json
 */
async function imageDefinitionBuildsCancelByImageDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectCatalogImageDefinitionBuild.cancel(
    "rg1",
    "DevProject",
    "CentralCatalog",
    "DefaultDevImage",
    "0a28fc61-6f87-4611-8fe2-32df44ab93b7",
  );
}

async function main() {
  await imageDefinitionBuildsCancelByImageDefinition();
}

main().catch(console.error);
