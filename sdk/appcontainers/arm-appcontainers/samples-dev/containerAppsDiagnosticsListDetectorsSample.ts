// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the list of diagnostics for a given Container App.
 *
 * @summary Get the list of diagnostics for a given Container App.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/ContainerAppsDiagnostics_List.json
 */

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getTheListOfAvailableDiagnosticsForAGivenContainerApp(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "mikono-workerapp-test-rg";
  const containerAppName = "mikono-capp-stage1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsDiagnostics.listDetectors(
    resourceGroupName,
    containerAppName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheListOfAvailableDiagnosticsForAGivenContainerApp();
}

main().catch(console.error);
