// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Analyzes a custom hostname for a Container App
 *
 * @summary Analyzes a custom hostname for a Container App
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ContainerApps_ListCustomHostNameAnalysis.json
 */

import {
  ContainerAppsListCustomHostNameAnalysisOptionalParams,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function analyzeCustomHostname(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "testcontainerapp0";
  const customHostname = "my.name.corp";
  const options: ContainerAppsListCustomHostNameAnalysisOptionalParams = {
    customHostname,
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.listCustomHostNameAnalysis(
    resourceGroupName,
    containerAppName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await analyzeCustomHostname();
}

main().catch(console.error);
