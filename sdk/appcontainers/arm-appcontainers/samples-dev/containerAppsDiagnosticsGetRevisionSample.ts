// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a revision of a Container App.
 *
 * @summary Get a revision of a Container App.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/Revisions_Get.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getContainerAppRevision(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const containerAppName = "testcontainerApp0";
  const revisionName = "testcontainerApp0-pjxhsye";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsDiagnostics.getRevision(
    resourceGroupName,
    containerAppName,
    revisionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getContainerAppRevision();
}

main().catch(console.error);
