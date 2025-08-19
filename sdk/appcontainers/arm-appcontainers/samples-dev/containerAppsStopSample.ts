// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Stop a container app
 *
 * @summary Stop a container app
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ContainerApps_Stop.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function stopContainerApp(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "testworkerApp0";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.beginStopAndWait(
    resourceGroupName,
    containerAppName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopContainerApp();
}

main().catch(console.error);
