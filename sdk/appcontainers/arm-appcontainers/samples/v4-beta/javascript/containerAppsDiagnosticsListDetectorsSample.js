// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of diagnostics for a given Container App.
 *
 * @summary get the list of diagnostics for a given Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsDiagnostics_List.json
 */
async function getTheListOfAvailableDiagnosticsForAGivenContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f07f3711-b45e-40fe-a941-4e6d93f851e6";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsDiagnostics.listDetectors(
    "mikono-workerapp-test-rg",
    "mikono-capp-stage1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheListOfAvailableDiagnosticsForAGivenContainerApp();
}

main().catch(console.error);
