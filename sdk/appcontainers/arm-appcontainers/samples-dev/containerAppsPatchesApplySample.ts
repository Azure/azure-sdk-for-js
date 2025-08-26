// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Apply a Container Apps Patch resource with patch name.
 *
 * @summary Apply a Container Apps Patch resource with patch name.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/ContainerAppsPatches_Apply.json
 */
async function containerAppsPatchesApply0(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "test-app";
  const patchName = "testPatch-25fe4b";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsPatches.beginApplyAndWait(
    resourceGroupName,
    containerAppName,
    patchName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerAppsPatchesApply0();
}

main().catch(console.error);
