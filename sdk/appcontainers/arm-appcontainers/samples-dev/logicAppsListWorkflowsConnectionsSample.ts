// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets logic app's connections.
 *
 * @summary Gets logic app's connections.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/preview/2025-02-02-preview/examples/LogicApps_ListConnections.json
 */
async function listTheWorkflowsConfigurationConnections(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "testrg123";
  const containerAppName = "testapp2";
  const logicAppName = "testapp2";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.logicApps.listWorkflowsConnections(
    resourceGroupName,
    containerAppName,
    logicAppName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listTheWorkflowsConfigurationConnections();
}

main().catch(console.error);
