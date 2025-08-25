// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a Container Apps Build resource
 *
 * @summary Delete a Container Apps Build resource
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/ContainerAppsBuilds_Delete.json
 */
async function containerAppsBuildsDelete0(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "testCapp";
  const buildName = "testBuild";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsBuilds.beginDeleteAndWait(
    resourceGroupName,
    containerAppName,
    buildName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerAppsBuildsDelete0();
}

main().catch(console.error);
