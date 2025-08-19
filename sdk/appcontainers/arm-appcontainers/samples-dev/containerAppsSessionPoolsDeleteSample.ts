// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete the session pool with the given name.
 *
 * @summary Delete the session pool with the given name.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/SessionPools_Delete.json
 */
async function deleteSessionPool(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const sessionPoolName = "testsessionpool";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.beginDeleteAndWait(
    resourceGroupName,
    sessionPoolName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteSessionPool();
}

main().catch(console.error);
