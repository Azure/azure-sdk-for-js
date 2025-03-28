/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  PatchSkipConfig,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Configure the Container Apps Patch skip option by patch name.
 *
 * @summary Configure the Container Apps Patch skip option by patch name.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2024-08-02-preview/examples/ContainerAppsPatches_Skip_Configure.json
 */
async function containerAppsPatchesSkipConfigure0() {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "test-app";
  const patchName = "testPatch-25fe4b";
  const patchSkipConfig: PatchSkipConfig = { skip: true };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsPatches.beginSkipConfigureAndWait(
    resourceGroupName,
    containerAppName,
    patchName,
    patchSkipConfig,
  );
  console.log(result);
}

async function main() {
  containerAppsPatchesSkipConfigure0();
}

main().catch(console.error);
