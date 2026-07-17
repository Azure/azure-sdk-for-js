// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists builds for a specified image definition.
 *
 * @summary lists builds for a specified image definition.
 * x-ms-original-file: 2026-01-01-preview/ImageDefinitions_ListImageBuildsByImageDefinition.json
 */
async function imageDefinitionBuildsListByImageDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projectCatalogImageDefinitionBuilds.listByImageDefinition(
    "rg1",
    "DevProject",
    "CentralCatalog",
    "DefaultDevImage",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await imageDefinitionBuildsListByImageDefinition();
}

main().catch(console.error);
