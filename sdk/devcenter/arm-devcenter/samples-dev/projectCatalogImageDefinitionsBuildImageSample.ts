// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to builds an image for the specified Image Definition.
 *
 * @summary builds an image for the specified Image Definition.
 * x-ms-original-file: 2026-01-01-preview/ImageDefinitions_BuildImage.json
 */
async function projectCatalogImageDefinitionsBuildImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectCatalogImageDefinitions.buildImage(
    "rg1",
    "DevProject",
    "CentralCatalog",
    "DefaultDevImage",
  );
}

async function main(): Promise<void> {
  await projectCatalogImageDefinitionsBuildImage();
}

main().catch(console.error);
